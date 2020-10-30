FROM node:8.16.0-alpine AS base
ENV APP=/app
WORKDIR $APP
COPY package.json package-lock.json $APP/
RUN npm install
COPY . $APP
RUN npm run-script build

FROM node:8.16.0-alpine AS test
ENV APP=/app
WORKDIR $APP
COPY package.json package-lock.json jasmine.json $APP/
RUN npm install
COPY --from=base /app/lib ./lib/

FROM node:8.16.0-alpine AS release
# ARG BOT_ID
# ARG API_BASE_URL
# ARG API_USER_NAME
# ARG API_USER_PASSWORD
# ENV NODE_ENV=production APP=/app BOT_ID=$BOT_ID API_BASE_URL=$API_BASE_URL API_USER_NAME=$API_USER_NAME API_USER_PASSWORD=$API_USER_PASSWORD
ENV APP=/app
WORKDIR $APP
COPY package.json package-lock.json $APP/
RUN npm install
COPY --from=base /app/lib ./lib/

CMD ["npm", "start"]