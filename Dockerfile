FROM node:14.21.1 as build-stage 

WORKDIR /app 

COPY . .
RUN yarn install 
COPY ./ /app/ 

RUN yarn run heroku-postbuild

FROM nginx:1.23.2

COPY ./nginx/nginx-CA-served.conf . 
COPY ./nginx/nginx-no-ssl.conf . 

ARG deployment_environment 
RUN if [ -z $deployment_environment ]; then \ 
        cp  ./nginx-no-ssl.conf /etc/nginx/conf.d/default.conf; \ 
    else \ 
        cp  ./nginx-CA-served.conf /etc/nginx/conf.d/default.conf; \ 
    fi 

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html 