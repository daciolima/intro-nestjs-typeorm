
## Projeto Exemplo usando typeORM com conexão no DB Postgres.

- Database Postgres
- TypeORM;
- Testes Unitários

## CLI Nest
```bash
# Guia de geradores
$ nest generate -h


## Comandos gerenciados de pacote **pnpm**

```bash
$ pnpm install <pacote>
```

## Rodando a aplicação

```bash
# modo developer
$ pnpm run start

# modo watch
$ pnpm run start:dev

# modo produção
$ pnpm run start:prod
```

## Comando testes

```bash
# Testes unitários
$ pnpm run test

# Testes e2e
$ pnpm run test:e2e

# Teste de código
$ pnpm run test:cov
```

## Comando TypeORM - Migrations

**Procedimento**

- Criar a migration da referida tabela
```bash
# Cria arquivo migration
npx typeorm migration:create src/migrations/CreateCoursesTable
```

- Configure os parâmetros necessários para a tabela envolvida;
- Realize um build da aplicação para gerar os arquivos, entre eles o arquivo de conexao usado pelo typeORM nas migration

- Rode as migration setando para o arquivo gerado no build;
```bash
npx typeorm migration:run -d dist/database/orm-cli-config.js

```

**Rodando testes**

- Teste e2e
```bash
# Executa teste local.
pnpm run test:e2e -- courses
```

- Configure os parâmetros necessários para a tabela envolvida;
- Realize um build da aplicação para gerar os arquivos, entre eles o arquivo de conexao usado pelo typeORM nas migration

- Rode as migration setando para o arquivo gerado no build;
```bash
npx typeorm migration:run -d dist/database/orm-cli-config.js

```


