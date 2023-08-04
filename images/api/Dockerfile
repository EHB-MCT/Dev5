FROM node:latest

WORKDIR /usr/api

COPY package*.json .
RUN npm install --quit

COPY ./ ./

CMD [ "npm", "start", "migrate"]