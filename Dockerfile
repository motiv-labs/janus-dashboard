FROM node:7-alpine AS builder

ARG GATEWAY_BASE_URI="'localhost:8080'"
ARG GATEWAY_USERNAME="admin"
ARG GATEWAY_PASSWORD="admin"

ENV GATEWAY_BASE_URI="${GATEWAY_BASE_URI}"
ENV GATEWAY_USERNAME="${GATEWAY_USERNAME}"
ENV GATEWAY_PASSWORD="${GATEWAY_PASSWORD}"

RUN mkdir /src
WORKDIR /src
COPY . /src

RUN npm install --quiet
RUN npm run build --quiet

# ---

FROM abiosoft/caddy
COPY --from=builder /src/dist /srv
COPY Caddyfile /etc/Caddyfile
