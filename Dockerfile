FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

COPY . .

RUN mkdir -p dist

RUN pnpm run build || (cat /app/dist/main.js 2>/dev/null || echo "Build failed! Check errors." && exit 1)

RUN test -f dist/main.js || (echo "dist/main.js is missing!" && exit 1)

ENV PORT=3031

EXPOSE 3031

CMD ["node", "dist/main.js"]
