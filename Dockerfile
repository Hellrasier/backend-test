FROM node:18-alpine as builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

COPY . .
# RUN chown -R 1000:1000 /app
# RUN npm run migrate:latest

CMD ["node", "index.js"]
