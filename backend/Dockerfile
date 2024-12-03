# Step 1: Use official Node.js image as base
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install backend dependencies
RUN npm install

# Step 5: Copy the entire backend folder to the container
COPY . .

# Step 6: Expose port 5000 (or any other port your backend uses)
EXPOSE 5000

# Step 7: Run the backend server using `nodemon`
CMD ["npm", "run", "backend"]
