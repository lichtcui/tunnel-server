FROM node:latest

WORKDIR /build
RUN apt update && apt install -y curl wget
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY ./public ./public
COPY ./main.js .
