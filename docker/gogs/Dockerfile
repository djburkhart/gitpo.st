# gitpo.st branded Gogs image
#
# Strategy for MVP:
#   1. Start from official Gogs Docker image (or our light fork)
#   2. Replace logo assets, favicon, add custom CSS for header/footer
#   3. Inject configuration for reverse-proxy auth (Google via oauth2-proxy)
#   4. Add helpful links in templates pointing to the GoCD UI ("CI/CD")
#
# Example base (adjust tag):
#   FROM gogs/gogs:latest
#
# Then COPY custom public/ assets, templates, etc.
#
# For deeper customization we will maintain a fork at github.com/gitpo-st/gogs
# and build from there.

FROM gogs/gogs:latest

# Placeholder - real branding steps will be added once we have assets
# COPY ./branding/ /app/gogs/public/
# COPY ./templates/  /app/gogs/templates/

# Example: pre-seed some gitpo.st friendly config
# ENV GOGS__server__APP_NAME="gitpo.st"
# ENV GOGS__auth__REVERSE_PROXY_AUTHENTICATION_ENABLED=true

LABEL org.opencontainers.image.title="gitpo.st/gogs"
LABEL org.opencontainers.image.description="Gogs with gitpo.st branding and GCP-friendly defaults"
