FROM node:lastest AS build
WORKDIR /build
ADD . /build
RUN npm install && npm run build:prod
FROM nginx:lastest
COPY --from build /build/dist/* /usr/share/nginx/html
ADD ./default.conf.template /etc/nginx/templates/
