#!/usr/bin/env bash
set -euo pipefail

REF="${VERCEL_GIT_COMMIT_REF:-}"
CMS_INTEGRATION_BRANCH="feature/1.1.7-cms-real"

if [[ "$REF" == "main" || "$REF" == "master" || "$REF" == "$CMS_INTEGRATION_BRANCH" ]]; then
  echo "Deploy: production branch ($REF)"
  exit 1
fi

echo "Skip deploy: only main/master or ${CMS_INTEGRATION_BRANCH} (got: ${REF:-empty})"
exit 0
