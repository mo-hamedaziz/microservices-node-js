# Base image
FROM node:20-alpine as base

# Install curl for debugging
RUN apk add --no-cache curl

# Set node environment (default to production)
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Default to port 3000 for the application
ARG PORT=3000
ENV PORT $INT_PORT
EXPOSE $INT_PORT

# Install latest npm for speed and fixes
RUN npm install -g npm@latest

# Create app directory and set permissions
RUN mkdir /app && chown node:node /app
WORKDIR /app

# Use non-root user
USER node

# Copy package files and install dependencies
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Development stage
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Production stage
FROM base as prod
COPY --chown=node:node . .
CMD ["node", "index.js"]
