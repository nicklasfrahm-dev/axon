FROM node:24 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs24-debian12:nonroot AS runtime
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next/standalone .next/standalone/
COPY --from=builder /app/.next/static .next/standalone/.next/static
COPY --from=builder /app/public .next/standalone/public

EXPOSE 3000
CMD [".next/standalone/server.js"]
