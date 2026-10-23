# Preview local opcional do site; a distribuição principal é o GitHub Pages.
FROM python:3.13-alpine AS site
WORKDIR /autoria
COPY ferramentas ./ferramentas
COPY apresentacao ./apresentacao
COPY docs ./docs
COPY exemplos ./exemplos
COPY compose ./compose
COPY index.html ./index.html
RUN python ferramentas/preparar_materiais.py --site-dir /site

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY infra/materiais.conf /etc/nginx/conf.d/default.conf
COPY --from=site /site/ /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
