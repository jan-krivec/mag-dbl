FROM node:latest as ganache
RUN apt-get update && apt-get install

WORKDIR /app
RUN npm install ganache --global
RUN npm install @trufflesuite/uws-js-unofficial
CMD ["ganache", "-h", "0.0.0.0", "--mnemonic", "horn hammer original lemon chapter weird gun pond fortune blush cupboard cat"]

FROM ontotext/graphdb:10.5.0 as graphdb