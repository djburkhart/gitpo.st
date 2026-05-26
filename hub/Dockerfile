# Dockerfile for gitpo.st-hub
# This should be built with context set to the hub/ directory:
#   docker build -t gitpo.st/hub:latest -f hub/Dockerfile .

# --- Build stage ---
FROM golang:1.26-alpine AS builder

# Install git + ca-certificates for go modules (if any private deps in future)
RUN apk add --no-cache git ca-certificates

WORKDIR /src

# Leverage Docker layer caching for dependencies.
# We only COPY go.mod because the project currently has no external dependencies
# (go.sum may not exist). When dependencies are added, go.sum will be generated.
COPY go.mod ./
RUN go mod download || true

# Copy the rest of the source
COPY . .

# Build a small static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w -X main.version=$(git rev-parse --short HEAD 2>/dev/null || echo dev)" \
    -o /gitpo.st-hub ./...

# --- Runtime stage ---
FROM gcr.io/distroless/static:nonroot

WORKDIR /app

COPY --from=builder /gitpo.st-hub /app/gitpo.st-hub

USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/gitpo.st-hub"]
