FROM node:latest

WORKDIR /usr/api

COPY package*.json .
RUN npm install --quit

COPY ./ ./

WORKDIR /usr/api/src

CMD npx knex migrate:latest ;npm start