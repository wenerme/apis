FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

COPY .yarn/cache /app/.yarn/cache
COPY packages/server/.next/cache /app/packages/server/.next/cache
COPY . /app
RUN yarn && yarn build

CMD [ "yarn", "start"]

#HEALTHCHECK --interval=5m --timeout=3s \
#  CMD sh -c 'curl -f "http://localhost:$${PORT:-3000}/" || exit 1'
