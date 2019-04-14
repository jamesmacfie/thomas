FROM node:10-slim

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn build

