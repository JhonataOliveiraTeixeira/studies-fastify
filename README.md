# Studies Fastify

> API simples em Node.js com TypeScript, Fastify e Drizzle ORM — projeto de estudo.

## Visão Geral

Este projeto implementa uma API REST minimalista para gerenciar cursos. Ele usa:

- `Fastify` como framework HTTP.
- `TypeScript` para tipagem estática.
- `Drizzle ORM` para mapeamento do banco de dados (migrations e schema em `drizzle/`).

O código-fonte principal está em `src/` e o ponto de entrada é `server.ts`.

## Requisitos

- Node.js (v18+ recomendado)
- npm
- Docker & Docker Compose (opcional, se quiser rodar serviços via `docker-compose.yml`)

## Instalação

1. Clone o repositório:

```bash
git clone <repo-url>
cd first-api
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo de ambiente `.env` na raiz (o projeto usa `--env-file .env` no script `dev`).

Exemplo de variáveis que você pode precisar (ajuste conforme seu setup):

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
PORT=3000
```

## Scripts úteis

- `npm run dev` — inicia o servidor em modo de desenvolvimento (usa `node --watch` com `server.ts`).
- `npm run db:generate` — gera artefatos do Drizzle (drizzle-kit).
- `npm run db:migrate` — aplica migrations usando `drizzle-kit`.

## Como rodar

1. (Opcional) Levante serviços com Docker Compose:

```bash
docker-compose up -d
```

2. Rode as migrations (se necessário):

```bash
npm run db:migrate
```

3. Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

O servidor usará as configurações do `.env`. O ponto de entrada é `server.ts`.

## Endpoints (rotas principais)

Os arquivos de rota estão em `src/routes/`.

- `get-courses.ts` — `GET /courses` — lista todos os cursos.
- `get-course-by-id.ts` — `GET /courses/:id` — retorna um curso por ID.
- `create-courses.ts` — `POST /courses` — cria um novo curso.

## Diagrama da rota principal

```mermaid
flowchart LR
  Client[Cliente] -->|GET /courses| Server[Fastify Server]
  Server -->|Consulta| DB[(Banco de Dados - Postgres / Drizzle)]
  DB -->|Rows / Resultado| Server
  Server -->|200 OK (JSON)| Client
```

Exemplo de requisição para criar um curso:

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Curso Exemplo","description":"Descrição"}'
```

Observação: os caminhos reais e o comportamento da API seguem as definições em `src/routes/routes.ts`.

## Banco de dados

O projeto utiliza `drizzle-orm` junto com `drizzle-kit` para migrations. A pasta `drizzle/` contém SQL/migrations geradas.

- Arquivos de configuração e cliente: `src/database/client.ts` e `src/database/schema.ts`.
- Rodar `npm run db:migrate` para aplicar migrations.

## Documentação da API

O projeto inclui dependências para `@fastify/swagger` e `@fastify/swagger-ui`. Se a documentação estiver configurada em `server.ts`, a interface Swagger deverá ficar disponível enquanto o servidor estiver rodando.

## Estrutura do projeto

```
.
├─ drizzle/                # migrations e snapshots
├─ src/
│  ├─ database/
│  │  ├─ client.ts
│  │  └─ schema.ts
│  └─ routes/
│     ├─ create-courses.ts
│     ├─ get-course-by-id.ts
│     ├─ get-courses.ts
│     └─ routes.ts
├─ server.ts
├─ package.json
└─ docker-compose.yml
```

## Como contribuir

- Abra uma issue descrevendo a sugestão ou bug.
- Faça um fork, crie uma branch com a feature/fix e envie um pull request.
- Mantenha o estilo TypeScript e adicione testes quando apropriado.

## Licença

Projecto sem licença especificada (adicionar `LICENSE` se desejar).

---

Se quiser, eu posso: adicionar exemplos de requests mais detalhados, documentar o schema do banco (`src/database/schema.ts`) ou configurar a rota de documentação Swagger no `README`. Quer que eu adicione algo mais?
