FROM nginx:latest
COPY dist /usr/share/nginx/html
ADD ./default.conf.template /etc/nginx/templates/
