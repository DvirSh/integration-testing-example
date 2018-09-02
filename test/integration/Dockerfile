FROM node:10.8.0-alpine

RUN apk update \
    && apk add --update openssl \
    && apk add bash

WORKDIR /opt/app
COPY package.json package-lock.json /opt/app/
RUN npm install

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod u+x ./wait-for-it.sh
COPY . /opt/app

CMD ["./wait-for-it.sh", "dogs-api:3000", "--", "./wait-for-it.sh", "employees-api:3001", "--", "./wait-for-it.sh", "dog-scheduling-service:3002", "--", "./wait-for-it.sh", "email-sending-service:3003", "--", "sh", "-c", "npm test"]
