FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install Dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy rest of the code to container
COPY . .

# Build the TypeScript code use webpack
RUN pnpm run build

# Expose the port the app runs on and the debug port
EXPOSE 3031 9229

# Run the API on Nodemon with debug enabled
CMD ["pnpm", "run", "start:prod"]
