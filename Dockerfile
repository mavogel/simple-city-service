# To build and run with Docker:
#
#  $ docker build -t mavogel/simple-city-service .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 mavogel/simple-city-service
#
FROM node:6.10.2-slim

RUN mkdir -p /quickstart /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /quickstart
COPY package.json /quickstart/
RUN npm install --unsafe-perm=true

COPY . /quickstart
RUN chown -R nodejs:nodejs /quickstart
USER nodejs

CMD npm start
