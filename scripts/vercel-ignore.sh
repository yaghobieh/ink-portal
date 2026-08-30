#!/usr/bin/env bash
set -euo pipefail

REF="${VERCEL_GIT_COMMIT_REF:-}"

if [[ "$REF" == "main" || "$REF" == "master" ]]; then
  echo "Deploy: production branch ($REF)"
  exit 1
fi

echo "Skip deploy: only main/master after release merge (got: ${REF:-empty})"
exit 0
