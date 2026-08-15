FROM node:22-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server.mjs ./
# sirv is only used by the container's static server, so it is installed here
# rather than declared in package.json, which the Astro build reads.
RUN npm i --no-save --omit=dev sirv@^3

EXPOSE 8080
CMD ["node", "server.mjs"]
