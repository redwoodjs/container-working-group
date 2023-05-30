# README

|      |                                                             |
| :--- | :---------------------------------------------------------- |
| PR   | https://github.com/redwoodjs/container-working-group/pull/5 |

Includes web and api dockerfile templates which contain no optimisations of any kind. The docker-compose file then can run these alongside the postgres db.

Steps for a working project

1. Copy env.defaults to .env
2. docker-compose up
3. Access the api container
  1. Run yarn rw prisma migrate dev
  2. Run yarn rw exec seed

I setup some various values to make this work. Like setting apiHost in the web serve command. Updated the env values to match db access etc.

## Test

I have not really tested the test stage/target. Yeah, not testing the testing that's a recipe for sleeping easy at night.

## Prerender

I had to make liberal use of ENTRYPOINT in order to support web building due to prerendering. This feels a little bad. There is probably a better approach to this.

## Measurement

We should measure the size of these unoptimised images to then get a sense of progress as we optimise. I haven't done it here because at the time of writing it's late and I'm tired 😴

Build the various images via eg: docker build -f ./api/Dockerfile . --target build -t redwoodjs-project/api-build
Image size via eg: docker inspect -f "{{ .Size }}" redwoodjs-project/api-build

Next steps?

- Having apiHost inside the dockerfile isn't going to work, need to sort that out.
- Optimise the multibuild, I'm not sure base makes much sense but the only way I could think to start out. Would have just had build as the base but then it had to be an entrypoint for web so... Might just not have very much shared between the various stages, almost like independent builds in the one file.
- Generally optimise, perform all the various node/yarn/prisma related tricks that can be done. See Michael's PR for inspiration on this.
