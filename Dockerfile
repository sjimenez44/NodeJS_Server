FROM node:10.15-slim

WORKDIR /app
RUN mkdir -p /app/app

ENV PORT_SERVER 7001
ENV HOST_DB mongo
ENV PORT_DB 27017
ENV NAME_DB nodejs

EXPOSE ${PORT_SERVER}

COPY ./package.json /app/package.json

RUN npm install

COPY ./app /app/app

ENTRYPOINT ["npm", "start"]