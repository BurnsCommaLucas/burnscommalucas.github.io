# Define node version
FROM node:14.20.0-alpine AS build
# Define container directory
WORKDIR /usr/src/app
# Copy all source over for build
COPY . .
# Run build
RUN yarn run heroku-prebuild
RUN yarn install
RUN yarn global add @angular/cli
RUN ng build --prod

FROM nginx:1.23.2-alpine
# Copy built angular files to NGINX HTML folder
COPY --from=build /usr/src/app/dist/personal-site/ /usr/share/nginx/html