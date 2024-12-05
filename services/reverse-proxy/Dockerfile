FROM nginx:stable

EXPOSE 443
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY html/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]