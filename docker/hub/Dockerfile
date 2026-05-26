# Build stage
FROM golang:1.26-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /gitpost-hub .

# Runtime
FROM gcr.io/distroless/static:nonroot
WORKDIR /
COPY --from=builder /gitpost-hub /gitpost-hub
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/gitpost-hub"]
