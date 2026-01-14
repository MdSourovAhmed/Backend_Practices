# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies first (for better caching)
COPY package*.json ./

RUN npm install --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 7000

# Start app
CMD ["node", "server.js"]
