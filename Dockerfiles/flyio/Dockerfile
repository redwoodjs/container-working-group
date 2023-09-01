FROM node:18 as base

RUN mkdir /app
WORKDIR /app

FROM base as build
COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock

RUN --mount=type=cache,mode=0777,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --immutable

COPY redwood.toml .
COPY graphql.config.js .

COPY scripts scripts
COPY api api
COPY web web
RUN yarn rw build
RUN --mount=type=cache,mode=0777,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn add -W @redwoodjs/cli @redwoodjs/api-server @redwoodjs/internal


FROM node:18-slim as release
ENV NODE_ENV production
WORKDIR /app

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

COPY --from=build /app/web/dist /app/web/dist
COPY --from=build /app/api /app/api
COPY --from=build /app/scripts /app/scripts
COPY --from=build /app/redwood.toml /app
COPY --from=build /app/graphql.config.js /app
COPY --from=build /app/node_modules /app/node_modules

COPY .env.defaults .
COPY .fly .fly

EXPOSE 8910

ENTRYPOINT ["sh"]
CMD [".fly/start.sh"]
