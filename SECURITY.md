# Security Policy

## Supported Versions

gitpo.st is currently in early development. We aim to provide security updates for the following:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |

We strongly recommend running the latest code from the `main` branch until we establish stable release tags.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them responsibly:

1. **Preferred**: Use GitHub's private vulnerability reporting feature on this repository (Security tab → Report a vulnerability).
2. **Alternative**: Email security concerns to the maintainers (see [CONTRIBUTING.md](CONTRIBUTING.md) for current contacts).

Include as much information as possible:
- Description of the vulnerability
- Steps to reproduce
- Potential impact (especially regarding GCP resources, authentication, or pipeline execution)
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and aim to provide a fix timeline.

## Security Considerations Specific to gitpo.st

gitpo.st combines **Gogs** (Git hosting) and **GoCD** (CI/CD) deployed on **Google Cloud Platform** (GKE). This architecture has several important security surfaces:

### High-Risk Areas

- **Terraform / Infrastructure as Code** — The Terraform modules can create highly privileged resources (GKE clusters, Cloud SQL, IAM service accounts with Workload Identity, GCS buckets). Never run untrusted Terraform code.
- **Webhook Handling** (`gitpo.st-hub`) — The integration service receives webhooks from Gogs and triggers GoCD pipelines. Input validation and signature verification are critical.
- **Authentication / SSO** — Google OAuth + oauth2-proxy + reverse proxy auth for Gogs. Misconfiguration can lead to account takeover.
- **Container Images** — Custom images for Gogs, GoCD, and the hub. Supply chain attacks are a concern.
- **GoCD Elastic Agents** — These run user-defined pipeline code with access to the cluster and (via Workload Identity) potentially GCP resources.
- **Secret Management** — Database credentials, OAuth client secrets, GCP service account keys (we strongly prefer Workload Identity over keys).

### Recommendations for Operators

- Always review Terraform plans before applying.
- Use private GKE clusters when possible.
- Prefer Workload Identity Federation over long-lived service account keys.
- Store secrets in Google Secret Manager.
- Regularly rotate OAuth credentials and database passwords.
- Monitor GoCD agent activity and pipeline executions.
- Keep Gogs, GoCD, and all dependencies up to date.

## Dependencies

gitpo.st depends on several large upstream projects:

- [Gogs](https://github.com/gogs/gogs) (MIT)
- [GoCD](https://github.com/gocd/gocd) (Apache 2.0)
- Various Helm charts and Docker base images

We monitor upstream security advisories and will update our Dockerfiles and deployment manifests accordingly.

## Scope

This security policy applies to:
- Code and configuration in this repository (`djburkhart/gitpo.st`)
- The reference Terraform modules and Helm/Kustomize manifests
- The `gitpo.st-hub` service
- Official container images published under the gitpo.st branding

It does **not** cover:
- Vulnerabilities in upstream Gogs or GoCD (report those to the respective projects)
- Security issues in user-deployed instances (unless they stem from a flaw in our reference code)

Thank you for helping keep gitpo.st and its users safe.
