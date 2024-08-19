# Base image
FROM node:20-alpine as base

# Default to port 3000 for the application
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# Install latest npm for speed and fixes
RUN npm install -g npm@latest

# Create app directory and set permissions
RUN mkdir /app && chown node:node /app
WORKDIR /app

# Use non-root user
USER node

# Copy package files and install dependencies
COPY --chown=node:node package*.json ./

# Development stage
FROM base as dev
RUN npm install && npm cache clean --force
COPY --chown=node:node . .
ENV NODE_ENV=development
CMD ["nodemon", "index.js"]

# Production stage
FROM base as prod
RUN npm install --only=production && npm cache clean --force
COPY --chown=node:node . .
ENV NODE_ENV=production
CMD ["node", "index.js"]