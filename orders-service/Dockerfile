FROM node:20-alpine as base

RUN apk add curl

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $INT_PORT
EXPOSE $INT_PORT

RUN npm i npm@latest -g

RUN mkdir app && chown node:node app
WORKDIR /app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH app/node_modules/.bin:$PATH

# Development stage
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Production stage
FROM base as prod
COPY --chown=node:node . .
CMD ["node", "index.js"]
