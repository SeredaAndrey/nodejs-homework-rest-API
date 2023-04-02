FROM node:18.15-alpine

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
