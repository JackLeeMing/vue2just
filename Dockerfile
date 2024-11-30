
FROM docker-registry.thunics.com:5000/nginx:stable-alpine
COPY nginx.conf /etc/nginx/
WORKDIR /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
EXPOSE 80

