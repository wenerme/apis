FROM node:12-alpine

RUN apk add --no-cache curl nano \
      # https://www.npmjs.com/package/node-gyp
      python make gcc g++

#RUN mkdir -p /app
#WORKDIR /app
#
#COPY .yarn /app
#COPY packages/server/.next/cache /app/packages/server/.next/cache
#COPY . /app
#RUN yarn && yarn build

RUN mkdir -p /app
WORKDIR /app

COPY .yarn/plugins /app/.yarn/plugins
COPY .yarn/releases /app/.yarn/releases
COPY .yarn/cache /app/.yarn/cache

COPY .yarnrc.yml /app
COPY yarn.lock /app
COPY package.json /app
COPY packages /app/packages
RUN yarn install --immutable --immutable-cache && yarn build

CMD [ "yarn", "start"]

#HEALTHCHECK --interval=5m --timeout=3s \
#  CMD sh -c 'curl -f "http://localhost:$${PORT:-3000}/" || exit 1'
