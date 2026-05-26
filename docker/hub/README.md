# Docker build context for gitpo.st-hub has moved

The official Dockerfile now lives at the root of the Go module:

**`hub/Dockerfile`**

### How to build

```bash
# From repo root
docker build -t gitpo.st/hub:latest -f hub/Dockerfile ./hub
```

Or using the workflows in `.github/workflows/`.

This directory is kept only for historical/reference purposes.
