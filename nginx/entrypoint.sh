#!/bin/sh
# Gera env-config.js, aplica VITE_API_URL no default.conf e inicia o nginx

set -e

VITE_API_URL=$(printf '%s' "${VITE_API_URL:-http://localhost:8080}" | tr -d '"' | sed 's:/*$::')
export VITE_API_URL

echo "Generating environment configuration..."

cat > /usr/share/nginx/html/env-config.js << EOF
// Auto-generated at container startup
window.ENV = {
  VITE_API_URL: "${VITE_API_URL}",
  VITE_APP_VERSION: "${VITE_APP_VERSION:-1.0.0}",
  VITE_FEATURE_FLAGS: "${VITE_FEATURE_FLAGS:-}",
  VITE_ANALYTICS_ID: "${VITE_ANALYTICS_ID:-}",
  VITE_SENTRY_DSN: "${VITE_SENTRY_DSN:-}",
};

Object.freeze(window.ENV);

console.log('[ENV] Configuration loaded:', {
  environment: window.ENV.VITE_ENVIRONMENT,
  apiUrl: window.ENV.VITE_API_URL,
  version: window.ENV.VITE_APP_VERSION,
});
EOF

echo "Generating Nginx configuration..."
envsubst '${VITE_API_URL}' < /etc/nginx/conf.d/default.conf.in > /etc/nginx/conf.d/default.conf

echo "Nginx proxy_pass:"
grep proxy_pass /etc/nginx/conf.d/default.conf

exec "$@"