# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the content of the /dist folder to the Nginx HTML directory
COPY /dist/accounting-frontend/browser /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]