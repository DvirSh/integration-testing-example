FROM node:10.8.0-alpine as dependencies

WORKDIR /src

COPY package.json ./
RUN npm install --production

FROM dependencies as tests

RUN npm install
COPY . .
RUN npm test

FROM dependencies as release

COPY src ./src

EXPOSE 3000

CMD npm start
