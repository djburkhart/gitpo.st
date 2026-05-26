# gitpo.st Examples

This directory contains sample applications and pipeline definitions that demonstrate the integrated Git + CI/CD experience.

## hello-gke

A tiny web service that can be built and deployed to GKE (or Cloud Run) by a GoCD pipeline triggered from a Gogs push.

## pipelines/

Opinionated `.gocd.yaml` (or GoCD config repo) examples for common languages and deployment targets.

## Goals of the examples

- Show the full loop: `git push` in Gogs → GoCD pipeline runs on elastic agents → artifact to GCS → deploy to GKE
- Be copy-paste friendly for new gitpo.st users
- Use best practices for GCP (Workload Identity in pipelines, least-privilege, etc.)

Contributions of new language examples or deployment patterns are very welcome!
