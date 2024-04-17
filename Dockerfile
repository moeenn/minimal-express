FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
USER node
RUN npm i -D

COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
