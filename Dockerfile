FROM node:18-alpine
WORKDIR /app
COPY package.json .env ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]