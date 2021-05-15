FROM node:14.17-alpine as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build
RUN yarn run test

FROM node:14.17-alpine

WORKDIR /app

COPY --from=build /app/dist/index.js /app
RUN mkdir /app/wwwroot

CMD ["node", "index.js"]
