# Terraform for gitpo.st on Google Cloud

This directory contains production-ready Terraform modules and example configurations to deploy the full gitpo.st stack (GKE + Cloud SQL + GCS + IAM) into a Google Cloud project.

## Prerequisites

- Google Cloud account + project with billing enabled
- `gcloud` CLI authenticated (`gcloud auth login`)
- Terraform >= 1.6
- Appropriate IAM permissions (Owner or combination of roles)

## Quick Start (Reference)

```bash
cd terraform/environments/dev

# 1. Copy and customize
cp terraform.tfvars.example terraform.tfvars
# Edit project_id, region, etc.

# 2. Initialize
terraform init

# 3. Plan & apply (review carefully!)
terraform plan
terraform apply
```

After apply you will get:
- GKE cluster credentials command
- Cloud SQL connection info (use Cloud SQL Auth Proxy or Workload Identity)
- GCS bucket names
- Service account emails for Workload Identity

## Directory Layout

```
terraform/
├── modules/
│   ├── gke/               # Cluster + node pools + networking
│   ├── cloud-sql/         # Postgres instance + databases + users
│   ├── storage/           # GCS buckets + IAM
│   ├── iam/               # Service accounts + Workload Identity + roles
│   └── networking/        # VPC, subnets, NAT, firewall (optional)
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
└── README.md
```

## Important Notes

- **Autopilot vs Standard**: The reference configuration defaults to GKE Autopilot for simplicity and lower ops. A Standard example with spot VMs for agents is also provided.
- **Cost control**: Autopilot + spot elastic agents for GoCD can be very cost effective. Monitor with billing alerts.
- **Secrets**: Never commit real secrets. Use Secret Manager (referenced from Terraform) + Workload Identity.
- **Upgrades**: GKE and Cloud SQL upgrades are manual or via Terraform — test in dev first.

## Connecting After Deployment

See the parent [k8s/README.md](../k8s/README.md) for Helm/Kustomize instructions once the infrastructure exists.

## Destroying

```bash
terraform destroy
```

**Warning**: This will delete the GKE cluster and Cloud SQL instance. Gogs repo data on persistent disks and GCS objects may be lost unless you have backups configured.

## Contributing

Improvements to the modules (better private cluster defaults, Filestore for Gogs HA, IPv6, etc.) are very welcome. Please open a discussion or PR with your use case.
