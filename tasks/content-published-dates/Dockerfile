FROM node:14-alpine
WORKDIR /app
ENV NODE_ENV production
WORKDIR /app/tasks/content-published-dates
ENTRYPOINT [ "node", "src/index.js" ]
ADD package.json yarn.lock /app/
ADD packages /app/packages
ADD tasks/content-published-dates /app/tasks/content-published-dates
RUN yarn --production --pure-lockfile
