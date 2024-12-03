# Frontend Dockerfile
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install dependencies for frontend
COPY package*.json ./
RUN npm install

# Copy the frontend source code to the container
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port 5173 (your React app's default port)
EXPOSE 5173

# Command to serve the built React app
CMD ["serve", "-s", "build", "-l", "5173"]
