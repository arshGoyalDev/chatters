FROM node:22-alpine3.22 AS base

FROM base AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_SERVER_VARIABLE
ENV NEXT_PUBLIC_SERVER_VARIABLE=${NEXT_PUBLIC_SERVER_VARIABLE}


RUN npm run build;

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG NEXT_PUBLIC_SERVER_VARIABLE
ENV NEXT_PUBLIC_SERVER_VARIABLE=${NEXT_PUBLIC_SERVER_VARIABLE}

EXPOSE 3000

CMD ["node", "server.js"]
