FROM node:16-alpine AS dependencies
WORKDIR /var/app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

FROM node:16-alpine AS build
ENV NODE_ENV production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN npm run build

FROM node:16-alpine AS prodDependencies
WORKDIR /var/app
COPY package.json package-lock.json ./
RUN npm ci --production
RUN wget -O /var/app/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
  chmod -v +x /var/app/dumb-init

FROM node:16-alpine AS runtime
ARG VERSION="0.0.1"
ENV VERSION $VERSION
ARG COMMIT
ENV COMMIT $COMMIT
ENV NODE_ENV production
WORKDIR /var/app
USER node
COPY --chown=node:node --from=prodDependencies /var/app/package.json package.json
COPY --chown=node:node --from=prodDependencies /var/app/node_modules node_modules/
COPY --chown=node:node --from=prodDependencies /var/app/dumb-init dumb-init
COPY --chown=node:node --from=build /var/app/prisma prisma/
COPY --chown=node:node --from=build /var/app/dist dist/
COPY --chown=node:node --from=build /var/app/scripts scripts/
ENTRYPOINT ["/var/app/dumb-init", "--"]
CMD ["sh", "scripts/init.sh"]