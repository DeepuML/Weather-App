# Use the official Nginx image
FROM nginx:alpine

# Clean default nginx content
RUN rm -rf /usr/share/nginx/html/*


# Copy your website files from the html folder to the Nginx HTML directory
COPY html/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]