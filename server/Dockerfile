FROM node:22-alpine3.22

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]