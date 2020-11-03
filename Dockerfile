FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install --silent
RUN npm install -g react-scripts --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]