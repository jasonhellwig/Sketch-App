FROM node:8
WORKDIR /usr/src/app

# install global packages
RUN apt-get update && apt-get install -y bash && \
apt-get clean && \
npm install -g serve && npm cache clean --force

# npm install
COPY package.json /tmp
RUN cd /tmp && npm install && npm cache clean --force && \
cp -R /tmp/node_modules /usr/src/app && \
rm -rf /tmp/node_modules

COPY . /usr/src/app

# Build for production.
RUN npm run build --production

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000