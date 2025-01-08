FROM node:18-alpine AS builder
RUN npm i pnpm -g
WORKDIR /app
COPY package.json ./
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next-env.d.ts ./

ENTRYPOINT npm run start


