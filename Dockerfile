
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/
WORKDIR /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
EXPOSE 80

