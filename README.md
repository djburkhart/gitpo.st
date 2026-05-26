# gitpo.st

**A modern, unified, self-hosted Git repository + CI/CD platform, opinionated for Google Cloud.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

gitpo.st brings together the simplicity and speed of [Gogs](https://gogs.io) (lightweight Git hosting) with the power and flexibility of [GoCD](https://www.gocd.org) (mature continuous delivery), wrapped in a cohesive branded experience designed for teams running on Google Cloud Platform.

## ✨ Vision

- **One cohesive product**, not two separate tools.
- Native, secure Google SSO (no more managing multiple logins).
- Beautiful, consistent branding and a unified dashboard for repos + pipelines.
- Production-ready on GKE with sensible defaults, easy to operate at small or growing scale.
- 100% open source. Bring your own GCP project. No vendor lock-in.

We start with proven, battle-tested components (Gogs + GoCD) and add the "glue" and polish that makes them feel like a single platform built for GCP.

## 🚀 Key Features (MVP + Roadmap)

### MVP (target: first 4-8 weeks)
- [ ] Branded Docker images for Gogs and GoCD with gitpo.st theming, logos, and consistent header/footer navigation
- [ ] Google SSO via oauth2-proxy (or native plugins) for both services — single Google login for everything
- [ ] Terraform for GCP: GKE cluster (Autopilot or Standard), Cloud SQL (Postgres), GCS buckets, Artifact Registry, IAM + Workload Identity, Secret Manager
- [ ] Helm/Kustomize manifests for easy deployment on GKE
- [ ] Webhook bridge + "gitpo.st Hub" (lightweight Go service) that:
  - Receives pushes from Gogs and triggers GoCD pipelines
  - Provides a simple unified web UI / API showing "My Repos + My Pipelines"
  - One-click "New Project" that creates a Gogs repo + starter GoCD pipeline
- [ ] Sample application + `.gocd.yaml` pipeline that builds, tests, and deploys to GKE/Cloud Run
- [ ] Excellent documentation + one-command-ish quickstart for local (kind) and real GCP
- [ ] Public GitHub project with clear contribution guide

### Post-MVP / Community Goals
- Deeper UI integration (shared navigation, activity feeds across Git + CD)
- Native OIDC/Google provider contributions back to Gogs fork (or maintained patch)
- GoCD elastic agents on GKE with spot/preemptible for low-cost CI
- GCS native artifact store integration
- Git LFS + large binary support on GCS-backed storage
- Policy-as-code / OPA integration for approvals
- Multi-tenancy / organizations improvements
- High-availability notes and scaling guides
- Operator or GitOps-based day-2 operations

## 🏗 Architecture (High Level)

```
Internet / Developers
        │
        ▼
GKE Ingress + cert-manager (gitpo.st or your domain)
        │
   ┌────┴────┐
   ▼         ▼
oauth2-proxy (Google SSO)
   │
   ├─► Gogs (Git)          ──webhook──►  gitpo.st-hub
   │     (custom image)                     │
   │                                        ▼
   └─► GoCD Server         ◄──API calls──  (unified dashboard
       (custom image)          triggers       + project wizard)
             │
             ▼
   GoCD Elastic Agents (pods on GKE)
             │
             ▼
   Cloud SQL (Postgres)  +  GCS (artifacts, repo mirrors, backups)
             │
   Workload Identity ──► IAM (least privilege)
```

**Why these two projects?**
- **Gogs**: Extremely lightweight Git server. Single-binary roots, easy to brand and run. Excellent webhook support.
- **GoCD**: One of the most powerful open-source CD systems. Outstanding pipeline modeling (fan-out, approvals, environments), first-class Kubernetes agent support, and mature API.
- Together on GKE they give you GitHub-like developer experience + enterprise CD capabilities with full control and Google Cloud economics.

We maintain **light forks** (or heavy customization via build-time patching) under the gitpo.st organization only where upstream theming/branding or small integration features require it. Goal: stay as close to upstream releases as possible while delivering a polished "single product" feel.

## ☁️ Google Cloud Focus

Everything is designed around GCP primitives:
- **GKE** for orchestration (recommended Autopilot for most users)
- **Cloud SQL** for reliable Postgres (both Gogs and GoCD)
- **GCS** for durable, cheap artifact + Git LFS storage
- **Artifact Registry** for custom images
- **Secret Manager** + **Workload Identity** for zero-secret-in-image security
- **Cloud DNS + Managed Certificates** (or cert-manager)
- Easy integration with Cloud Build, Cloud Deploy, etc. as complements if desired

Terraform modules will be the primary "install" method. Users own their GCP project entirely.

## 🛠 Local Development & Quickstart

### Frontend (web/)

```bash
cd web
npm install
npm run dev
```

The UI is built with **Next.js + Tailwind + Headless UI + the Catalyst UI Kit** (Tailwind Plus).

**Note:** The Catalyst components are commercial and not committed to this repo. See [web/README.md](web/README.md) for setup instructions (requires a Tailwind Plus license).

See [web/README.md](web/README.md) for more details.

### Backend (hub/)

```bash
cd hub
go run .
```

## 📦 Deployment on GCP

See [terraform/README.md](terraform/README.md) and [k8s/README.md](k8s/README.md).

High-level:
1. Create a GCP project + enable billing + required APIs.
2. `terraform init && terraform apply` (creates cluster, DB, buckets, etc.).
3. `helm install` or `kubectl apply -k` the gitpo.st stack.
4. Configure your Google OAuth client (one-time).
5. Point DNS or use the load balancer IP.

## 🤝 Contributing

We welcome contributions of all kinds — docs, Terraform improvements, Helm values, Go code for the hub, UI polish, sample pipelines, testing on real GCP workloads.

**Before contributing**, please read:
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

We use GitHub issue and pull request templates to help keep things organized.

Because we fork/customize Gogs and GoCD, contributions that make sense upstream will be encouraged (and we will maintain clear patch lists).

## 📜 License

MIT (to match Gogs) for new code in this repository.  
Gogs components remain under MIT.  
GoCD components remain under Apache 2.0.

## 🙏 Acknowledgments

- The Gogs maintainers and community
- The GoCD / Thoughtworks team and community
- All the excellent GCP + Kubernetes tooling communities (Terraform, Helm, oauth2-proxy, cert-manager, etc.)

---

**gitpo.st** — Git and CD that just works together on Google Cloud.

*Let's build the self-hosted platform we wish existed.*