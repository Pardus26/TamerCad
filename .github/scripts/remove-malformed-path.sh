#!/usr/bin/env bash
set -euo pipefail

API_BASE="https://api.github.com/repos/${OWNER}/${REPO}/contents"
BRANCH="${BRANCH}"

MALFORMED="${MALFORMED}"

ENCODED_PATH=$(python3 - <<PY
import urllib.parse, os
s = os.environ.get('MALFORMED','')
print(urllib.parse.quote(s, safe=''))
PY
)

LIST_URL="${API_BASE}/${ENCODED_PATH}"
echo "Listing: ${LIST_URL}"

RESPONSE=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" "${LIST_URL}")
echo "${RESPONSE}" | jq .

# Normalize to array
if echo "${RESPONSE}" | jq -e 'type==\"object\"' >/dev/null 2>&1; then
  ITEMS_JSON=$(echo "[${RESPONSE}]" )
else
  ITEMS_JSON="${RESPONSE}"
fi

COUNT=$(echo "${ITEMS_JSON}" | jq 'length')
echo "Found ${COUNT} items"

if [ "${COUNT}" -eq 0 ]; then
  echo "No items found"
  exit 0
fi

for i in $(seq 0 $((COUNT-1))); do
  path=$(echo "${ITEMS_JSON}" | jq -r ".[$i].path")
  sha=$(echo "${ITEMS_JSON}" | jq -r ".[$i].sha")
  type=$(echo "${ITEMS_JSON}" | jq -r ".[$i].type")
  echo "Deleting: ${path} (type=${type}) sha=${sha}"
  encoded_item=$(python3 - <<PY
import urllib.parse,sys,os
p = sys.argv[1]
print(urllib.parse.quote(p, safe=''))
PY
"${path}")
  delete_url="${API_BASE}/${encoded_item}"
  curl -s -X DELETE -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/json" \
    -d "{\"message\":\"Remove malformed path item: ${path}\",\"sha\":\"${sha}\",\"branch\":\"${BRANCH}\"}" \
    "${delete_url}" | jq .
done

echo "Finished. If directories remain, rerun with their paths until none remain."
