# gitpo.st Architecture & Design

**Status**: Draft / For discussion (as of project inception)

**Goal of this document**: Define the high-level architecture, integration strategy between Gogs + GoCD, GCP deployment model, branding approach, and MVP scope so contributors have a shared vision.

## 1. Product Principles

1. **Unified Experience First** — Users should feel they are using one product called gitpo.st, not "Gogs with some GoCD bolted on".
2. **Stay Close to Upstream** — We only diverge (fork/patch) where it delivers clear user value for the "unified + GCP-native" positioning. Security patches and features should flow upstream where possible.
3. **GCP-Native by Default** — Every major subsystem maps cleanly to Google Cloud primitives (GKE, Cloud SQL, GCS, Artifact Registry, IAM, etc.).
4. **Open Source & User-Owned** — Users run this in their own GCP project. We provide excellent Terraform + docs. No hosted "gitpo.st cloud" in v1 (future community discussion).
5. **Pragmatic Minimalism** — Prefer simple, proven patterns (oauth2-proxy, Helm, sidecar patterns) over building everything from scratch.

## 2. Core Components

| Component          | Base                  | Why Chosen                          | Customization Level (MVP)          | Notes |
|--------------------|-----------------------|-------------------------------------|------------------------------------|-------|
| Git Hosting        | Gogs                 | Lightweight, Go, great webhooks, easy to brand, low resource | Custom Docker image + templates   | Primary fork target for theming |
| CI/CD              | GoCD                 | Mature pipelines, excellent K8s elastic agents, powerful modeling | Custom Docker image + config      | Less invasive theming initially |
| Auth / SSO         | oauth2-proxy         | Battle-tested Google support, header auth works perfectly with Gogs reverse-proxy mode + GoCD | Minimal (values + config)         | Single source of truth for Google login |
| Unified Glue       | **gitpo.st-hub** (new Go service) | The "secret sauce" that makes two systems feel like one | 100% new code (small surface)    | Dashboard aggregation, project wizard, webhook normalization |
| Orchestration      | Kubernetes (GKE)     | Official support in both projects + elastic agents | N/A                               | Autopilot recommended for most |
| DB                 | Cloud SQL Postgres   | HA, backups, point-in-time recovery for both apps | N/A                               | Separate DBs or schemas |
| Artifact Storage   | GCS                  | Cheap, durable, integrates with GoCD via plugins or explicit steps | N/A                               | GoCD GCS artifact plugin or `gsutil` in pipelines |
| IaC                | Terraform            | Idempotent, reviewable, GCP provider is excellent | N/A                               | Modules for cluster, sql, storage, iam |

## 3. Integration Strategy (The "Unified Experience")

### 3.1 Authentication (SSO)

**MVP approach (recommended):**
- Deploy single `oauth2-proxy` instance (or two if cookie domain requires it).
- Gogs configured with `auth.reverse_proxy` + appropriate header (`X-WEBAUTH-USER` etc.).
- GoCD uses its Google OAuth plugin (or also sits behind oauth2-proxy if the plugin path is smoother).
- Result: One Google consent screen, consistent identity.

**Future (if community wants deeper):**
- Contribute a proper OIDC / Google native provider to Gogs.
- Use shared OIDC issuer everywhere + groups/claims for role mapping.

### 3.2 Webhook & Trigger Flow (Push → Pipeline)

1. Developer pushes to Gogs repo.
2. Gogs fires webhook (we prefer GitHub-compatible payload format for broad compatibility).
3. Webhook hits `gitpo.st-hub` (exposed via Ingress or internal service).
4. Hub:
   - Validates signature / secret.
   - Looks up or creates the corresponding GoCD pipeline (by convention: repo name + branch → pipeline).
   - Calls GoCD API to schedule the pipeline (with extra properties: commit SHA, branch, pusher, etc.).
5. GoCD material (Git) either polls the Gogs clone URL (fine for MVP) or we later add a true "webhook material" if needed.
6. Pipeline runs on elastic agents.

**Alternative simpler path for MVP (if hub is delayed):**
Direct Gogs webhook → GoCD generic webhook receiver or `/go/api/pipelines/.../schedule` with basic auth token. The hub makes the experience much nicer later.

### 3.3 Unified Dashboard & "New Project" Wizard (gitpo.st-hub)

This is the key differentiator.

The hub (small Go web service + HTMX or lightweight frontend) will expose:
- `/` or `/dashboard` — Aggregated view: "Your repositories (from Gogs API) + Active pipelines (from GoCD API)"
- `/projects/new` — Wizard:
  1. Choose template (Go, Node, Python, custom).
  2. Creates repo in Gogs (with README + `.gocd.yaml` skeleton or GoCD config repo pattern).
  3. Registers the Git material in GoCD.
  4. Creates initial pipeline definition via GoCD API.
  5. (Optional) Creates initial Cloud SQL / GCS resources via Terraform Cloud or a service account? (stretch for MVP)
- API endpoints for the above so a future rich SPA or VS Code extension can consume them.

This service becomes the natural place for future "gitpo.st platform" features.

### 3.4 Branding & Theming

**Docker build-time branding (preferred for MVP):**
- `docker/gogs/Dockerfile` — FROM official Gogs image (or our light fork), `COPY` replacement assets (logo.svg, favicon, custom CSS, modified templates for header/nav that link to `/ci`).
- Similar for GoCD (more complex because of its asset pipeline; volume-mounted overrides or rebuild of frontend bundles).

**Runtime theming where possible** (config maps, env).

Longer term: Maintain a `gitpo.st/gogs` fork with permanent changes (colors, default strings, menu additions) and build our images from the fork. Same for GoCD if high-value changes emerge.

## 4. GCP Deployment Model

### 4.1 Recommended Topology (MVP)

- **GKE Autopilot** (or Standard with node auto-provisioning) in a dedicated cluster or shared.
- **1-2 node pools**: system + (for agents) spot/preemptible friendly.
- **Cloud SQL Postgres** (HA, automated backups) — one instance, two databases (gogs, gocd) or separate instances.
- **GCS buckets**:
  - `gitpo-st-artifacts-<env>`
  - `gitpo-st-repos-backup` (optional rsync or restic of Gogs `/data`)
  - `gitpo-st-lfs` (future)
- **Artifact Registry** repo `gitpo-st` (Docker images for custom gogs, gocd, hub).
- **Service accounts** + Workload Identity for:
  - Gogs pods (limited)
  - GoCD server & agents (GCS read/write for artifacts)
  - Hub (Gogs + GoCD API access + possibly Secret Manager)
- **Ingress**: GKE Ingress or nginx-ingress + cert-manager (or Google-managed certs).
- **Network**: Private cluster recommended, Cloud NAT for egress.

### 4.2 Terraform Structure (proposed)

```
terraform/
├── modules/
│   ├── gke/
│   ├── cloud-sql/
│   ├── storage/
│   └── iam/
├── environments/
│   ├── dev/
│   └── prod/
└── README.md
```

Each module outputs connection info that Helm values consume via Terraform → Helm data flow (or use Terraform's Helm provider carefully, or generate values files).

### 4.3 Day-2 Operations

- GitOps for the platform itself (Flux or Argo CD running on the same cluster — meta!).
- Automated DB backups + point-in-time restore docs.
- Gogs repo data durability story (PD snapshots + periodic `git bundle` or borg/restic to GCS).
- GoCD config export / backup strategy (GoCD has backup plugins or DB + config repo).

## 5. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Fork maintenance burden | High | Stay minimal. Document exact patches. Prefer build-time asset replacement over source forks initially. |
| Gogs horizontal scaling / HA for Git data | Medium | Document single-replica reality + Filestore option. Position as "great for teams up to dozens/hundreds of devs". |
| GoCD perceived as "heavy" vs lighter alternatives | Medium | Emphasize pipeline power + K8s agents as differentiator. Provide comparison table. |
| Upstream divergence / security lag | High | Automated dependabot / renovate on our custom Dockerfiles. Clear policy for forking. |
| OAuth2-proxy as extra moving part | Low | Very mature project; we are not the first to use it this way. |

## 6. MVP Scope (Concrete Checklist)

See the checkboxes in the root [README.md](../README.md). Anything not listed is explicitly post-MVP.

Non-goals for first release:
- Full UI unification (iframes or merged frontend monolith)
- Multi-cluster / multi-region Git
- Built-in package registry (npm, container, etc.)
- Advanced GitOps CRDs (we can integrate with existing tools)

## 7. Technology Choices for New Code

- **gitpo.st-hub**: Go 1.26+ (aligns with Gogs), standard library + chi or echo router, or even simpler. HTMX + Tailwind for the first UI to keep bundle tiny. PostgreSQL client not needed (it proxies).
- **Docker**: Multi-arch (amd64 + arm64) from day one.
- **IaC**: Terraform (HCL) + (optional) Terragrunt for env composition.
- **Packaging**: Helm 3 + Kustomize for overlays (branding, env differences).
- **CI for this repo**: GitHub Actions (build images, terraform validate, lint, e2e on kind).

## 8. Open Questions (need community input)

- Exact name for the hub service (`hub`, `controlplane`, `gitpost`, `platform`?)
- Do we want a small custom frontend SPA (React/Vue/Svelte) or server-rendered + HTMX is enough for v1?
- Preferred GKE mode for the reference Terraform (Autopilot vs Standard + Karpenter or Cluster Autoscaler)?
- Should the "New Project" wizard create real GCP resources (e.g. a Cloud Run service + Cloud SQL) or stay inside Git+CD only?

---

**Next step**: Once this direction is agreed, we will create the first working Terraform + Helm skeleton + a trivial version of the hub, plus the custom image build for Gogs branding.

Contributions and feedback welcome via issues and discussions.