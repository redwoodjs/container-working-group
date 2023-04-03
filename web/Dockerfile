# Use a multi-stage docker build
FROM nginx AS builder
COPY dist /dist
# Remove the sourcemap files from the builder stage so this layer isn't in the final image
RUN find /dist -name '*.map' -delete
# Same with license files
RUN find /dist -name '*.LICENSE.txt' -delete

FROM nginx AS publish
# Copy from the builder stage so we have a clean image
COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
