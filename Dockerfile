FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --production

COPY . .

RUN mkdir -p dist

RUN pnpm run build || (echo "Build failed!" && exit 1)

RUN test -f dist/main.js || (echo "dist/main.js is missing!" && exit 1)

ENV PORT=3030

EXPOSE 3030

CMD ["node", "dist/main.js"]
