FROM node:10-slim

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Building app
RUN yarn build

# Copying source files
COPY . .

EXPOSE 3000
