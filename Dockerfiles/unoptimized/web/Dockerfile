#
# Base
#
FROM node:18 as base

RUN yarn cache clean

RUN mkdir /app
WORKDIR /app

COPY package*.json .

COPY yarn.lock .
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml

COPY ./web/package*.json ./web/

RUN yarn install

COPY . .

#
# Build
#
FROM base as build

ENTRYPOINT [ "/bin/sh", "-c", "yarn rw build web" ]

#
# Test
#
FROM base as test

ENTRYPOINT [ "/bin/sh", "-c", "yarn rw test web --no-watch" ]

#
# Serve
#
FROM base as serve

CMD yarn rw build web && yarn rw serve web --apiHost http://api-serve:8911
