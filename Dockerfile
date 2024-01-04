ARG NODE_VERSION="18.17.1"
ARG ALPINE_VERSION="3.17"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
WORKDIR /home/app
COPY . .
RUN npm set progress=false && npm config set depth 0 && npm ci

FROM base AS build
COPY . .

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}
USER node
WORKDIR /home/node
COPY --from=build /home/app/node_modules ./node_modules
COPY --from=build /home/app/ .
ENV NODE_ENV production
ENTRYPOINT ["node", "./server.js"]