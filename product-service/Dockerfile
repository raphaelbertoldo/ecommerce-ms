FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY / .
RUN rm -rf node_modules/
RUN npm install
RUN npm rebuild
EXPOSE 3002
CMD [ "node", "index.js"]
