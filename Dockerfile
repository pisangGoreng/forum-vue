# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-alpine

ENV PORT=8080

# Create and change to the app directory.
# RUN mkdir -p /usr/src/app \
#   set -ex && \
#   adduser node root && \
#   chmod g+w /app && \
#   apk add --update --no-cache \
#   g++ make python \
#   openjdk8-jre
# WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm ci

# Copy local code to the container image.
COPY . ./

RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "serve" ]



