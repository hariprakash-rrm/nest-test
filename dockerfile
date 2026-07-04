FROM node:22-alpine
WORKDIR /backend/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

RUN npm run build

EXPOSE 3000

CMD ["node","dist/main"] 

# CMD ["npm","run","start:dev"]