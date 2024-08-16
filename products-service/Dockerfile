# FROM node:14-slim also works here
FROM node:20-alpine as base

RUN apk add curl

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN npm i npm@latest -g

RUN mkdir app && chown node:node app
WORKDIR /app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH app/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "start"]

FROM base as prod
COPY --chown=node:node . .
HEALTHCHECK --interval=600s CMD node ./src/healthcheck.js
CMD ["node", "./index.js"]
