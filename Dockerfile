FROM node:12

# app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY ./app ./app

EXPOSE 3000
CMD ["node", "app/server.js"]