#!/usr/bin/env bash
set -ex

BASEDIR=$(realpath "$(dirname "$0")"/..)
echo Building apis - "$BASEDIR"

yarn

yarn build
yarn workspaces foreach -p run build:docs
yarn workspaces foreach -p run build:storybook

mkdir packages/server/public/docs
mkdir packages/server/public/storybook

for i in ui tinyrpc utils rjsf-antd-theme; do
  [ -d "packages/$i/docs" ] cp -r packages/$i/docs packages/server/public/docs
  [ -d "packages/$i/storybook" ] cp -r packages/$i/storybook packages/server/public/storybook
done
