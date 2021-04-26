FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g serve

# add app
COPY ./public ./public
COPY ./src ./src
RUN npm run build

# start app
COPY ./run.sh ./
CMD ["./run.sh"]
