FROM node:8-alpine

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install

# Build the app
RUN npm run build --production --quiet

# Expose the app port
EXPOSE 8082

# Start the app
CMD npm start
