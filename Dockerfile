FROM node:16-alpine3.14  as builder
RUN  npm install -g npm@latest

# RUN mkdir -p /home/node/app
WORKDIR /node/app

COPY . .
COPY package*.json ./
COPY tsconfig*.json ./
COPY data*.json ./
RUN npm install typescript -g &&\
    npm install &&\
    npm run build
# RUN chown -R node /app/node_modules

#stage 2
FROM builder as base
RUN  npm install -g npm@latest
# RUN apk add --no-cache tini
# RUN mkdir -p /home/node/app
WORKDIR /node/app

COPY package*.json ./
COPY data*.json ./
RUN npm install

COPY --from=builder node/app/dist/ dist/
EXPOSE 3000

CMD ["node","dist/main.js"]