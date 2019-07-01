FROM node:10
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

CMD ["yarn", "prod"]
