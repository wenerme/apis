#!/usr/bin/env bash
set -ex

BASEDIR=$(realpath "$(dirname "$0")"/..)
cd "$BASEDIR"

echo Building apis - "$BASEDIR"

npm ci
npm run build
mkdir -p public/docs
mkdir -p public/storybook

#for i in ui tinyrpc utils rjsf-antd-theme; do
#  name=$(jq '.name' -r packages/$i/package.json)
#  mkdir -p packages/server/public/pkgs/$name/{docs,storybook}
#  [ -d "packages/$i/docs" ] && rsync -a packages/$i/docs/ packages/server/public/pkgs/$name/docs/
#  [ -d "packages/$i/storybook" ] && rsync -a packages/$i/storybook/ packages/server/public/pkgs/$name/storybook/
#done
