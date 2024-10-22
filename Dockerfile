FROM node:lts


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install --silent

COPY . .

ENV DATABASE_URL="mongodb://host.docker.internal:27017/swiftApi"
ENV PORT=3100


RUN npm run build

EXPOSE 3100

CMD ["node", "dist/index.js"]