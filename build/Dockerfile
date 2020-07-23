FROM wener/node:docker
RUN apk add --no-cache \
      # https://www.npmjs.com/package/node-gyp
      python3 python2 make gcc g++ \
      # canvas
      # https://github.com/Automattic/node-canvas/issues/1065#issuecomment-445548120
      cairo-dev pango-dev jpeg-dev pixman-dev \
      rsync jq bash
