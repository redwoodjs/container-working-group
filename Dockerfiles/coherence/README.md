# README

|      |                                                             |
| :--- | :---------------------------------------------------------- |
| PR   | https://github.com/redwoodjs/container-working-group/pull/3 |

These aren't production ready, but highlight what we (Zach and the Coherence team) believe is the right direction of the functionality of docker in the redwood application lifecycle. Overall:

- Lots of opportunity to optimize the final image size, e.g. stripping unused system components and build artifacts from the images (possibly with multi-stage builds for some of that)
- Need to evaluate the right default CMD instructions
- Probably need different images for dev & prod, maybe with extra dev packages or with different default commands
- Need to agree on if alpine is appropriate variant of OS for the base image

Generally the lifecycle of these images is that Dockerfile.api is used to build & run the api server. Dockerfile.web is used as the dev server for web, and is used to build the web assets, possibly in CI/CD. Static file hosting in prod is not part of redwood's role in compiling the assets, so it isn't part of the Dockerfile for web.

One point to highlight is that there is no docker-compose file included. There are several additional components along with these 2 images that the working final system will require, and docker-compose is one good option for how to run them (especially in dev - possibly we will want 2 compose files in the long run, one for dev and one for VM hosting - or to use some kind of tagging/environment concept in compose).

- database (if required)
- redis (if required)
- static file server (in production) - e.g. caddy or nginx, which would copy the output of the build from the web image and would serve it. in production, another alternative is to use static file hosting and a CDN, e.g. S3/CloudFront

## Benchmarks

| Image tag             | Size |
| :-------------------- | :--- |
| coherence-api-fc12590 | 2GB  |
