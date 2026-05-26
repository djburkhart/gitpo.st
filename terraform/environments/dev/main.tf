# gitpo.st - Development Environment on Google Cloud
# This is a reference configuration. Customize heavily for production.

terraform {
  required_version = ">= 1.6"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Replace these values
variable "project_id" {
  description = "Your GCP project ID"
  type        = string
  default     = "your-gcp-project-id"
}

variable "region" {
  description = "Primary GCP region"
  type        = string
  default     = "us-central1"
}

variable "cluster_name" {
  type    = string
  default = "gitpost-dev"
}

# TODO: Add module calls once modules are implemented
# module "networking" {
#   source = "../../modules/networking"
#   ...
# }

# module "gke" {
#   source = "../../modules/gke"
#   project_id   = var.project_id
#   cluster_name = var.cluster_name
#   region       = var.region
#   # autopilot    = true
# }

# module "cloud_sql" {
#   source = "../../modules/cloud-sql"
#   ...
# }

# module "storage" {
#   source = "../../modules/storage"
#   ...
# }

# module "iam" {
#   source = "../../modules/iam"
#   ...
# }

output "next_steps" {
  value = <<-EOT
    Infrastructure skeleton created.

    Next:
    1. Implement the modules under ../../modules/
    2. Run terraform apply
    3. Configure kubectl: gcloud container clusters get-credentials ${var.cluster_name} --region ${var.region}
    4. Proceed to ../k8s/ for application deployment
  EOT
}
