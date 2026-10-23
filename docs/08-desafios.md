# Desafios, diagnóstico e recuperação

Atividades de aprofundamento e diagnóstico após os exemplos principais. Execute na pasta HOME/oficina-docker com os YAMLs baixados e use somente os recursos do exercício.

## 1. O banco está no endereço errado

Introduza a falha:

```bash
export DB_HOST=localhost
docker compose -f compose.app.yaml up -d --force-recreate api
docker compose -f compose.app.yaml ps -a
docker compose -f compose.app.yaml logs --tail 30 api
```

Resultado esperado: a API procura o PostgreSQL no próprio container e aguarda até falhar a inicialização. `config` permite observar o valor resolvido. Alterar variável no shell não modifica um processo já em execução; por isso recriamos a API.

Recuperação:

```bash
unset DB_HOST
docker compose -f compose.app.yaml up -d --force-recreate --wait api
docker compose -f compose.app.yaml up -d --wait web
```

Se você também gravou `DB_HOST=localhost` em `.env`, remova ou corrija essa linha para `db`; `unset` só remove a variável do shell.

## 2. A porta do navegador está errada

Abra `http://localhost:8089`, mantendo a configuração padrão. Compare com a saída:

```bash
docker compose -f compose.app.yaml ps
docker compose -f compose.app.yaml port web 8080
```

Recuperação: use a porta publicada exibida, normalmente `http://localhost:8088`. Não altere código Go para corrigir um endereço digitado errado no navegador.

## 3. Um mount ocultou os arquivos

A primeira IDE abre /workspace; a segunda abre /host-home, que é HOME do computador. Não há pasta exemplos/mural presumida no host. Compare:

```bash
docker inspect ide
```

O comando mostra os Mounts do container ide. Se a IDE já estiver sendo gerenciada pelo Compose, encerre-a com docker compose -f compose.ide.yaml down no lugar de docker rm. A montagem não mescla automaticamente os diretórios. Não usar `rm -rf` para tentar fazer os arquivos ocultos reaparecerem.

## 4. A senha mudou, mas o volume continuou

As variáveis `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB` da imagem PostgreSQL inicializam um diretório de dados vazio. Alterar a variável depois não muda automaticamente um banco já inicializado.

Recuperação para a oficina: voltar às credenciais com as quais aquele volume foi criado. Para descartar intencionalmente todos os recados e inicializar de novo, usar `down -v` no projeto da aplicação e subir novamente. Em dados reais, atualizar a credencial no banco com procedimento apropriado em vez de apagar o volume.

## 5. A imagem do colega não foi usada

Confirme a referência resolvida:

```bash
docker compose -f compose.app.yaml -f compose.hub.yaml config --images
```

Confira API_IMAGE e execute pull api. Os Compose de consumo não possuem build. Se usou --pull never no exercício de imagem local, volte ao comportamento normal para buscar a imagem publicada.

## 6. Limpeza específica

Encerrar sem apagar o banco; a última linha remove apenas a IDE de demonstração e sua camada gravável:

```bash
docker compose -f compose.app.yaml down
docker rm -f ide
```

Limpar os containers e o volume do laboratório básico, se ainda existirem:

```bash
docker rm -f fs-lab
docker volume rm dados-lab
```

Cada comando pode informar recurso inexistente caso já tenha sido removido; isso não exige limpeza global. Para apagar somente os dados do mural:

```bash
docker compose -f compose.app.yaml down -v
```

Não usar comandos globais de prune para encerrar a oficina em uma máquina que pode ter outros projetos.

## 7. Checklist de explicação

- Onde o processo executa e qual é o principal?
- Em qual camada ou mount o arquivo foi escrito?
- Qual operação removeu ou preservou esse recurso?
- Quem faz a chamada de rede e o que localhost significa ali?
- A imagem consumida foi construída localmente ou baixada?
- Que configuração outra pessoa precisa para executar a mesma aplicação?

Fontes: [Compose down](https://docs.docker.com/reference/cli/docker/compose/down/), [rede](https://docs.docker.com/compose/how-tos/networking/), [PostgreSQL](https://hub.docker.com/_/postgres).
