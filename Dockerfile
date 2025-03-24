FROM node:22.13.0-alpine3.20

# Install pnpm
RUN npm install -g pnpm

# Setting Working Directory
WORKDIR /app

# Copying only package.json
COPY package.json pnpm-lock.yaml ./

# Install Dependencies using pnpm
RUN pnpm install

# Copy rest of the code to container
COPY . .

# Build the TypeScript code use webpack
RUN pnpm run build

# Expose the port the app runs on and the debug port
EXPOSE 3031 9229

# Run the API on Nodemon with debug enabled
CMD ["pnpm","run", "start:dev"]