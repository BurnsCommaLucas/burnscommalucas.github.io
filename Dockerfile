FROM node:16.20.2 as build-stage 

WORKDIR /app 

COPY . .
RUN yarn install 
COPY ./ /app/ 

RUN yarn run heroku-postbuild

FROM nginx:1.23.2

COPY ./nginx/nginx-no-ssl.conf . 

RUN cp  ./nginx-no-ssl.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html 