FROM node:current-alpine3.17

WORKDIR /home/node/todo-app

RUN apk add xdg-utils

USER node

ENTRYPOINT [ "/bin/sh", "./scripts/dev.sh" ]
