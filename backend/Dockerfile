FROM node:alpine

ENV NODE_ENV=prod
ENV PORT=8000
ENV CREDENTIALS_KEY=05f0e6fac9b428e0d518104aa580097e

# Install PM2
RUN npm install -g pm2

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD . /usr/src/app

RUN npm run build

CMD ["pm2-runtime", "bin/src/server.js"]

EXPOSE 8000