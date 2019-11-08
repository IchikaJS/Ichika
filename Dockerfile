FROM node:12.13.0-alpine

RUN mkdir /app
COPY . /app/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]