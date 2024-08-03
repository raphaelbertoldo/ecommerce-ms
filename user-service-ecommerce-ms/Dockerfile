FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY /src/ .
RUN rm -rf node_modules && npm install
RUN npm rebuild
EXPOSE 3001
CMD [ "node", "index.js"]
