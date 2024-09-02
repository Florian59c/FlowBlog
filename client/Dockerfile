FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json .
RUN npm i

COPY public public
COPY src src
EXPOSE 3000

CMD ["npm", "start"]