FROM node:12.13.0-alpine

RUN mkdir /app
COPY . /app/

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]