FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY conf /usr/share/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
