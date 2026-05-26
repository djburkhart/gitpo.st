# gitpo.st Roadmap

This is a living document. Dates are aspirational and depend on contributor bandwidth.

## Phase 0 — Foundations (Current)

- [x] Project vision, architecture, and initial scoping with early contributors
- [x] Repository skeleton + key docs (README, ARCHITECTURE, ROADMAP, LICENSE)
- [ ] GitHub org setup (gitpo-st or similar) + initial team
- [ ] CONTRIBUTING.md + issue/PR templates + Code of Conduct
- [ ] Basic CI (GitHub Actions) for linting docs and Terraform validation

## Phase 1 — MVP Core (Target: 4–8 weeks from kickoff)

**Must ship for a credible "unified Git + CI/CD on GCP" experience**

### 1.1 Google Cloud Infrastructure
- [ ] Production-grade Terraform modules for:
  - GKE (Autopilot + optional Standard reference)
  - Cloud SQL Postgres (HA)
  - GCS buckets (artifacts, backups)
  - Artifact Registry
  - IAM + Workload Identity pools
  - VPC + private cluster networking (optional)
- [ ] Environment overlays (dev / staging / prod examples)
- [ ] One-command or Cloud Shell-friendly quickstart script / tutorial

### 1.2 Kubernetes Workloads
- [ ] Custom Docker images (multi-arch):
  - `gitpo.st/gogs` — upstream + branding assets + custom templates + reverse-proxy auth ready
  - `gitpo.st/gocd-server` — upstream + theming (logo, links to Git UI)
  - `gitpo.st/hub` — the new integration service (initial version)
- [ ] Helm chart(s) or Kustomize base + overlays for the full stack (Gogs, GoCD, hub, oauth2-proxy, ingress)
- [ ] Working example values for GKE + Cloud SQL + GCS

### 1.3 Authentication & Branding
- [ ] Documented + tested Google SSO flow using oauth2-proxy (or GoCD Google plugin + Gogs reverse proxy)
- [ ] Consistent visual identity applied (logo, colors, "gitpo.st" naming in headers/footers)
- [ ] Shared navigation affordances (links between Git and CI UIs)

### 1.4 Integration Glue (gitpo.st-hub)
- [ ] Webhook receiver that normalizes Gogs push events and calls GoCD schedule API
- [ ] Read-only aggregation API / simple web UI:
  - List repos (Gogs)
  - List pipelines + status (GoCD)
- [ ] Basic "Create Project" wizard (repo + starter pipeline definition)

### 1.5 Developer Experience
- [ ] End-to-end sample: Push to Gogs → pipeline runs on GoCD elastic agent → deploys a small app to GKE or Cloud Run
- [ ] `.gocd.yaml` examples + best-practice pipeline templates (Go, Node, Python, Docker)
- [ ] Local development story (kind + Tilt or docker-compose for quick iteration)

### 1.6 Documentation & Polish
- [ ] Architecture decision records (ADRs) for key choices
- [ ] Operator / admin runbooks (backup/restore, scaling, upgrades)
- [ ] User guide: "From zero to first pipeline in < 30 minutes on your GCP project"
- [ ] Security model & threat model notes

## Phase 2 — Hardening & Community (Months 2–4)

- [ ] Elastic agent autoscaling + cost-optimization guides (spot instances, cluster autoscaler)
- [ ] GoCD GCS artifact plugin integration (or equivalent) as first-class
- [ ] Improved Gogs storage strategy docs (Filestore for multi-replica, backup automation)
- [ ] Automated image rebuilds + security scanning (Trivy, Dependabot)
- [ ] First community contributions accepted
- [ ] Public demo instance (non-production, sponsored credits) or clear "try it locally" path
- [ ] Performance & scale testing report (50 users, 200 repos, 1000 pipelines)

## Phase 3 — Differentiation (Months 4+)

- [ ] Deeper product integration (unified activity feed, cross-service search, single project settings page)
- [ ] Native Google OIDC contribution or maintained patch for Gogs
- [ ] Advanced templates & policy (OPA/Gatekeeper examples for pipeline approvals)
- [ ] Optional "gitpo.st" SaaS tier discussion (or stay purely self-hosted)
- [ ] Integration with other GCP services (Cloud Deploy, Cloud Functions as pipeline steps, etc.)
- [ ] Multi-region / disaster recovery guidance

## Out of Scope (for now or forever)

- Becoming a general-purpose PaaS
- Built-in container registry / npm proxy (plenty of great options exist)
- Replacing GoCD or Gogs entirely with a from-scratch rewrite
- Supporting non-GCP clouds as primary target (community ports welcome)

## How to Influence the Roadmap

1. Open a GitHub Discussion with your use case.
2. Sponsor specific features via GitHub Sponsors or direct contribution.
3. Join the working group calls (TBD — will be announced in Discussions).

---

*Last updated: Project inception*