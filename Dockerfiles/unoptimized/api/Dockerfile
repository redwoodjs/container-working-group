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

COPY ./api/package*.json ./api/

RUN yarn install

COPY . .

#
# Build
#
FROM base as build

ENTRYPOINT [ "/bin/sh", "-c", "yarn rw build api" ]

#
# Test
#
FROM base as test

ENTRYPOINT [ "/bin/sh", "-c", "yarn rw test api --no-watch" ]

#
# Serve
#
FROM base as serve

CMD yarn rw build api && yarn rw serve api
