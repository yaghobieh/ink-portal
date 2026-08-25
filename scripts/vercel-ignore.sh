#!/usr/bin/env bash
set -euo pipefail

REF="${VERCEL_GIT_COMMIT_REF:-}"
CMS_INTEGRATION_BRANCH="feature/1.1.7-cms-real"

if [[ "$REF" == "main" || "$REF" == "master" || "$REF" == "$CMS_INTEGRATION_BRANCH" || "$REF" == feature/CMS-* ]]; then
  echo "Deploy: production branch ($REF)"
  exit 1
fi

echo "Skip deploy: only main/master, ${CMS_INTEGRATION_BRANCH}, or feature/CMS-* (got: ${REF:-empty})"
exit 0
