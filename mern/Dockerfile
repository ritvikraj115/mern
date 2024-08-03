# Stage 1: Build the React application
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (React's default)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
