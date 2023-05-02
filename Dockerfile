FROM node:16

# Create the working directory
WORKDIR /usr/src/devhub

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --timeout=300000

# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "start"]