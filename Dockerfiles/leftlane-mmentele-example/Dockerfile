########### Build Stage ############
FROM node:16

# Prisma requires libssl1.1 and -slim doesn't include it, we need it at build time and run time.
RUN apt-get update && apt-get install -y libssl1.1 && rm -rf /var/lib/apt/lists/*

WORKDIR /home/apiuser

# Optimize rebuilding this container by copying just the files we need to run yarn install
# this avoids irrelevant changes in other files from invalidating the module install layer
COPY ./package.json ./
COPY ./yarn.lock ./.yarnrc.yml ./
COPY ./.yarn ./.yarn
COPY ./api/package.json ./api/
COPY ./web/package.json ./web/
COPY ./utils ./utils

# Try to avoid installing devDependencies, specifically this omits playwright and cypress which are quite large.
RUN yarn install

COPY . ./
# Actually create the compiled api/dist files
# RUN yarn rw build api
RUN ./node_modules/.bin/rw generate types
RUN cp ./web/types/graphql.d.ts ./utils/types/graphql.ts
RUN ./node_modules/.bin/lerna exec --no-private -- yarn build
RUN ./node_modules/.bin/rw build api


# Delete all of the modules we required for building and from the web workspace
# This allows us to generate a new node_modules with only the "runtime" modules installed
RUN rm -rf node_modules

# Install just the modules we require for running the api server
# We have to reimport the workspace tools because we override it in the copy . ./ earlier.
# we do the "runtime" install in the build image because that give sus access to the .yarn cache directory
RUN yarn plugin import workspace-tools && yarn workspaces focus api

# Generate prisma in the "build image" so we can leave its cached files behind
RUN ./node_modules/.bin/prisma generate --schema=api/db/schema.prisma

########### Final Stage ############
FROM node:16-slim
# Prisma requires libssl1.1 and -slim doesn't include it
RUN apt-get update && apt-get install -y libssl1.1 && rm -rf /var/lib/apt/lists/*
RUN corepack enable && useradd --create-home --user-group apiuser
USER apiuser
WORKDIR /home/apiuser
COPY --from=0 --chown=apiuser:apiuser /home/apiuser/node_modules/ ./node_modules
COPY --from=0 --chown=apiuser:apiuser /home/apiuser/api/ ./api
# We need this because @leftlane/constants is created as a *symlink* to utils/constants
# also we must copy from the build image because the constants folder contains generated (dist) files
# we need, that aren't part of the checkout
COPY --from=0 --chown=apiuser:apiuser /home/apiuser/utils/ ./utils
COPY --chown=apiuser:apiuser ./redwood.toml ./

CMD [ "./api/container-entrypoint.sh" ]
