FROM node:18.14.0-alpine

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
