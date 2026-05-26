# gitpo.st branded GoCD Server image
#
# GoCD theming is a bit more involved (Java + frontend assets).
# Common approaches:
#   - Volume mount custom logos / CSS at runtime (simplest for MVP)
#   - Rebuild frontend bundles from source (if we fork)
#   - Use GoCD's built-in logo replacement via Server Settings
#
# For the first version we will likely:
#   1. Use the official gocd/gocd-server image
#   2. Document how to inject our logo + "Back to Git" links
#   3. Later produce a truly custom image from a gitpo.st/gocd fork if needed

FROM gocd/gocd-server:v24.3.0   # pin a recent stable version

LABEL org.opencontainers.image.title="gitpo.st/gocd-server"
LABEL org.opencontainers.image.description="GoCD with gitpo.st branding and GCP elastic-agent friendly configuration"
