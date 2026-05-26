# Kubernetes / Helm Deployment for gitpo.st

This directory contains Helm charts, Kustomize bases, and example values for deploying the full gitpo.st stack onto a GKE cluster created by the Terraform in `../terraform/`.

## Recommended Tools

- Helm 3
- kubectl
- (Optional but nice) kustomize, helmfile, or Argo CD / Flux for GitOps

## High-Level Components Deployed

- `oauth2-proxy` (Google SSO)
- `gogs` (branded Git hosting)
- `gocd-server`
- `gitpo.st-hub` (integration + unified experience layer)
- Ingress / cert-manager (or GKE Ingress)
- Supporting ConfigMaps, Secrets (via External Secrets or manual), ServiceAccounts with Workload Identity annotations

## Quick Deploy Flow (once infrastructure exists)

```bash
# 1. Get cluster credentials
gcloud container clusters get-credentials gitpost-dev --region us-central1

# 2. Create namespace
kubectl create namespace gitpost

# 3. (Future) Add our Helm repo or use local charts
# helm repo add gitpost https://...

# 4. Install / upgrade the stack
helm upgrade --install gitpost ./charts/gitpost \
  -n gitpost \
  -f values-gke-dev.yaml \
  --set gogs.ingress.host=git.yourdomain.com \
  --set gocd.ingress.host=ci.yourdomain.com
```

## Directory Layout

```
k8s/
├── charts/
│   └── gitpost/           # Umbrella chart (or individual charts)
├── kustomize/
│   ├── base/
│   └── overlays/
│       ├── dev/
│       └── prod/
├── values/
│   ├── values-gke-autopilot.yaml
│   └── values-gke-standard.yaml
└── README.md
```

## Google-Specific Considerations

- Use **Workload Identity** instead of node service account keys.
- Reference Cloud SQL via the Cloud SQL Auth Proxy sidecar or the native Postgres IAM authentication (when available).
- GCS access from pods via Workload Identity + IAM roles on the GCS buckets.
- For Gogs persistent storage: Use a `PersistentVolumeClaim` with `gce-pd` or (for HA) Google Filestore (NFS).

## Branding Injection

The custom container images (`gitpo.st/gogs`, etc.) already contain most branding. Additional runtime configuration (titles, links, OAuth client IDs) comes from values files and ConfigMaps.

## Next Steps for Contributors

1. Create the first version of `charts/gitpost/Chart.yaml` and basic templates (even if they just deploy the official upstream images + our custom ones).
2. Add example `values-*.yaml` files with comments.
3. Document the exact oauth2-proxy configuration that works with Gogs reverse-proxy auth.
4. Add a simple Kustomize version for people who prefer to avoid Helm.

Pull requests that make the first successful `helm install` on a real GKE cluster easier are extremely valuable.
