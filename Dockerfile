FROM node:latest as ganache
WORKDIR /app
RUN npm install -g ganache-cli
CMD ["ganache-cli", "-h", "0.0.0.0", "-m", "horn hammer original lemon chapter weird gun pond fortune blush cupboard cat"]

FROM ontotext/graphdb:10.5.0 as graphdb