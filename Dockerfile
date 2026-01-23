FROM node:20-alpine

WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Clean install for reproducibility
RUN npm ci

# Copy source code
COPY ./frontend/ .

# Create non-root user for security (optional but recommended)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S sourov -u 1001 && \
    chown -R sourov:nodejs /app && \
    chown -R sourov:nodejs /root/.npm
USER sourov

# Start dev server
CMD ["npm", "run", "dev"]

# Expose Vite dev port
EXPOSE 5173