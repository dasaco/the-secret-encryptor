FROM node:10.17-alpine AS build

RUN apk add --update \
  bash \
  python \
  python-dev \
  build-base

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
