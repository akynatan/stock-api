
FROM node:14.17.1

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["yarn", "dev:server"]
