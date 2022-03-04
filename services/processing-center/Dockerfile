FROM node:12.18.1-alpine

COPY /src /app/src
COPY /contracts /app/contracts
COPY ./.env /app/dist/.env
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN npm i
RUN npx tsc


WORKDIR /app/dist

CMD ["node", "main.js"]