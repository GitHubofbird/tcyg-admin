FROM nginx

ADD ./* /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT [ "service","nginx","start"]