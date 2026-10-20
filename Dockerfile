FROM alpine:3.22 AS pacote
RUN apk add --no-cache zip
WORKDIR /oficina-docker
COPY . .
RUN cd / && zip -qr /oficina-docker.zip oficina-docker -x 'oficina-docker/downloads/*' 'oficina-docker/.runtime/*' 'oficina-docker/.git/*' 'oficina-docker/node_modules/*' 'oficina-docker/.test-results/*'

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY infra/materiais.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY apresentacao /usr/share/nginx/html/apresentacao
COPY docs /usr/share/nginx/html/docs
COPY exemplos /usr/share/nginx/html/exemplos
COPY --from=pacote /oficina-docker.zip /usr/share/nginx/html/downloads/oficina-docker.zip
COPY README.md ROTEIRO.md REFERENCIAS.md TESTES.md /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
