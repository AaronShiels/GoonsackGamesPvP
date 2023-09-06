FROM node:20
WORKDIR /home/node/app

COPY package*.json .
RUN npm ci --omit=dev

COPY dist/server .

ENV TICK_RATE=5
CMD [ "node", "server/index.js" ]
