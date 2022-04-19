FROM node:latest AS build
WORKDIR /build
ADD . /build
RUN npm install && npm run build:prod
FROM nginx:latest
COPY --from=build /build/dist/* /usr/share/nginx/html
ADD ./default.conf.template /etc/nginx/templates/
