#!/usr/bin/env bash
# set -ex

BASEDIR=$(realpath "$(dirname "$0")"/..)
cd "$BASEDIR"

echo Building apis - "$BASEDIR"

yarn

yarn build
yarn workspaces foreach -p run build:docs
yarn workspaces foreach -p run build:storybook

mkdir -p packages/server/public/docs
mkdir -p packages/server/public/storybook

for i in ui tinyrpc utils rjsf-antd-theme; do
  name=$(jq '.name' -r packages/$i/package.json)
  [ -d "packages/$i/docs" ] && rsync -a packages/$i/docs/ packages/server/public/pkgs/$name/docs/
  [ -d "packages/$i/storybook" ] && rsync -a packages/$i/storybook/ packages/server/public/pkgs/$name/storybook/
done
