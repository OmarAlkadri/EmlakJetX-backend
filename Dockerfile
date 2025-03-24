FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm @nestjs/cli && pnpm install --frozen-lockfile

COPY . .

RUN mkdir -p dist

RUN pnpm run build || (echo "Build failed! Check errors." && exit 1)

RUN test -f dist/main.js || (echo "dist/main.js is missing!" && exit 1)

ENV PORT=3031

EXPOSE 3031

CMD ["node", "dist/main.js"]
