# Stage 1: Build Stage
FROM node:18-alpine as build

# Install build dependencies
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install better-sqlite3 --save
RUN npm install -g node-gyp esbuild@0.20.2 vite
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production

# Add node_modules to PATH
ENV PATH=/opt/node_modules/.bin:$PATH

# Copy the rest of the app and build
WORKDIR /opt/app
COPY . .

# # Copy .env.production into the container
# COPY .env.production /opt/app/.env.production

# Build the app
RUN npm run build -- --debug

# Stage 2: Production Stage
FROM node:18-alpine

# Install runtime dependencies
RUN apk add --no-cache vips-dev

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/

# Copy node_modules from the build stage
COPY --from=build /opt/node_modules ./node_modules

# Copy the app files from the build stage
WORKDIR /opt/app
COPY --from=build /opt/app ./

# # Ensure .env.production is copied
# COPY --from=build /opt/app/.env.production /opt/app/.env.production

# Add node_modules to PATH
ENV PATH=/opt/node_modules/.bin:$PATH

# Set permissions for the node user
RUN chown -R node:node /opt/app
USER node

# Expose the default port for Strapi
EXPOSE 1337

# Start the app
CMD ["npm", "run", "start"]
