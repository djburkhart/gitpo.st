# Contributing to gitpo.st

Thank you for your interest in making gitpo.st the best unified Git + CI/CD experience for Google Cloud!

We are an open source project built on top of [Gogs](https://gogs.io) and [GoCD](https://www.gocd.org). We aim to stay close to upstream while adding the integration, branding, and GCP-native polish that makes the combination feel like one product.

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Ways to Contribute

- **Documentation & Guides** — Huge impact. Quickstarts, runbooks, architecture diagrams, pipeline examples.
- **Terraform & Kubernetes** — Improve modules, add features (private clusters, Filestore, etc.), better examples.
- **Branding & Theming** — Logos, CSS, templates, consistent language.
- **gitpo.st-hub** — The Go service that ties everything together (webhooks, aggregation API, wizard).
- **Testing & Feedback** — Try it on your real GCP workloads and report issues + improvements.
- **Upstream Contributions** — Many fixes and features we need can go directly to Gogs or GoCD.

## Development Setup (Local)

We use **kind** (Kubernetes in Docker) for local development.

Prerequisites:
- Docker / Colima / OrbStack
- kind
- kubectl + helm
- Go 1.26+ (for the hub)
- Terraform (for full GCP simulation, optional locally)

```bash
# 1. Clone
git clone https://github.com/djburkhart/gitpo.st.git   # or your fork
cd gitpo.st

# 2. Start a local cluster (one-time)
kind create cluster --name gitpost-dev

# 3. (Coming soon) One-command dev environment
# make dev
```

Detailed instructions will live in `docs/development.md` (PRs welcome to create it).

## Building Custom Images

See `docker/gogs/` and `docker/gocd/` for the Dockerfiles that add gitpo.st branding.

We publish to GitHub Container Registry (`ghcr.io/djburkhart/gogs`, etc.) and/or Artifact Registry in examples.

## Pull Request Process

1. Fork the repo and create your branch from `main`.
2. If you are changing behavior, open an issue or discussion first for alignment.
3. Keep PRs focused. Large refactors should be discussed.
4. Update documentation for user-facing changes.
5. Ensure `terraform validate` and any linters pass (CI will check).
6. Request review. We aim for friendly, constructive feedback.

Because we maintain forks/custom images of Gogs and GoCD, please call out in the PR description:
- Whether the change should also be proposed upstream.
- Any long-term maintenance burden introduced.

## Project Structure (MVP)

```
.
├── README.md
├── docs/                 # Architecture, roadmap, ADRs, user guides
├── terraform/            # GCP infrastructure as code
├── k8s/                  # Helm charts or Kustomize bases
├── docker/
│   ├── gogs/             # Custom Gogs image build
│   └── gocd/             # Custom GoCD image build
├── hub/                  # gitpo.st-hub (Go) — the integration layer
├── .github/
│   └── workflows/        # CI for images, Terraform, etc.
└── examples/             # Sample apps + .gocd.yaml pipelines
```

## Communication

- GitHub Discussions (primary)
- Issues for bugs & feature requests
- (Future) Discord / Slack if the community grows

## Recognition

All contributors are listed in the project. Significant contributions may be highlighted in release notes.

Thank you for helping build something great for the self-hosted community on Google Cloud!
