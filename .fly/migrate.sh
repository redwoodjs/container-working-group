# #!/bin/sh

# This command pushes us over 256MB of RAM at release time
yarn rw prisma migrate deploy

# run data migrations
yarn rw data-migrate up
