. .
EXPOSE 3100
RUN chown -R node /usr/src/app
USER node
CMD ["node", "dist/index.js"]
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 