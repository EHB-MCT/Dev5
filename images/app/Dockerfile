FROM node:latest

WORKDIR /usr/app

COPY package*.json .
RUN npm install --quit

COPY ./ ./

WORKDIR /usr/app

CMD npm rebuild esbuild ;npx vite
