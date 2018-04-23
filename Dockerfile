FROM node:9.6-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY public/ ./public/
COPY src/ ./src/
RUN npm run build

# -----

FROM nginx:1.12-alpine
MAINTAINER HelloFresh
COPY --from=builder /app/src/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY --from=builder /app/src/config.js.tmpl /tmp/
EXPOSE 80
CMD envsubst < /tmp/config.js.tmpl > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'
