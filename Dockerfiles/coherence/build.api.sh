#! /usr/bin/env bash

CURRENT_SHA=$(git rev-parse --short HEAD)
TAG=coherence-api-"$CURRENT_SHA"

docker build \
  -t "$TAG" \
  -f Dockerfiles/coherence/Dockerfile.api \
  .

SIZE=$(docker images --format json "$TAG" | jq .Size)

echo "|$TAG|$SIZE|"
