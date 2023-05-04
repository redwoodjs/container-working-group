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

COPY ./api/package*.json ./api/

RUN yarn install

COPY . .

RUN yarn rw generate types
RUN yarn rw build api

#
# Test
#
FROM build as test

RUN yarn rw test api

#
# Serve
#
FROM build as serve

CMD ["yarn", "rw", "serve", "api"]
