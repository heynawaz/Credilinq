FROM node:latest

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
