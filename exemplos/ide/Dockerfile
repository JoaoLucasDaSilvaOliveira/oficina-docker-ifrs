FROM debian:bookworm-slim
ARG LOCAL_UID=1000
ARG LOCAL_GID=1000
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl gnupg x11-utils dbus-x11 libasound2 libgbm1 libxshmfence1 \
    && install -d /etc/apt/keyrings \
    && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg \
    && printf 'deb [arch=%s signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/code stable main\n' "$(dpkg --print-architecture)" > /etc/apt/sources.list.d/vscode.list \
    && apt-get update && apt-get install -y --no-install-recommends code \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid "$LOCAL_GID" aluno \
    && useradd --uid "$LOCAL_UID" --gid "$LOCAL_GID" --create-home --shell /bin/bash aluno \
    && mkdir -p /workspace /tmp/runtime-aluno \
    && chown aluno:aluno /workspace /tmp/runtime-aluno \
    && chmod 700 /tmp/runtime-aluno
RUN chmod 1777 /workspace
COPY Dockerfile /opt/oficina/receitas/ide.Dockerfile
USER aluno
ENV HOME=/tmp XDG_RUNTIME_DIR=/tmp/runtime-aluno
WORKDIR /workspace
CMD ["code", "--no-sandbox", "--disable-gpu", "--ozone-platform=x11", "--new-window", "--wait", "."]
