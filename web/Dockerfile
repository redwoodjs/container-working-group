#
# Build
#
FROM node:18 as build

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

RUN yarn rw build web

#
# Test
#
FROM build as test

RUN yarn rw test web

#
# Serve
#
FROM build as serve

CMD ["yarn", "rw", "serve", "web", "--apiHost", "http://api:8911"]
