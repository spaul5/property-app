FROM node:boron

# create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# install app dependencies
COPY package.json /usr/src
RUN npm install

# bundle app source
COPY . /usr/src

EXPOSE 5000
CMD node app.js