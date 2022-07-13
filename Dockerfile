FROM nginx:alpine
COPY build /etc/nginx/html
COPY conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
