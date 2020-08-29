FROM wener/node

COPY dist/server /opt/app/bin/server

CMD [ "node", "/opt/app/bin/server" ]
