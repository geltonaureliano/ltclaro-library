# Sistema de Biblioteca LT Claro

Sistema de gerenciamento de biblioteca desenvolvido com arquitetura hexagonal e Domain-Driven Design (DDD).

## Tecnologias

- **Backend**: Node.js com NestJS 9
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Validação**: class-validator
- **Documentação API**: Swagger
- **Observabilidade**: OpenTelemetry, Prometheus, Grafana, Tempo
- **Logs**: pino-http (formato JSON)
- **Conteinerização**: Docker
- **Infraestrutura como Código**: Terraform

## Arquitetura

O projeto segue a arquitetura hexagonal com DDD, organizada da seguinte forma:

```
src/
├── modules/             # Módulos da aplicação (bounded contexts)
│   ├── catalog/         # Módulo de catálogo
│   │   ├── domain/      # Camada de domínio (entidades, regras de negócio)
│   │   ├── application/ # Camada de aplicação (casos de uso, serviços)
│   │   ├── interface/   # Adaptadores primários (controladores, DTOs)
│   │   └── infrastructure/ # Adaptadores secundários (repositórios)
│   ├── circulation/     # Módulo de circulação (empréstimos)
│   ├── users/           # Módulo de usuários
│   └── reports/         # Módulo de relatórios
└── infrastructure/      # Infraestrutura compartilhada
    ├── prisma/          # Cliente e configuração do Prisma
    └── telemetry/       # Configuração de telemetria
```

## Módulos

- **Catalog**: Gerenciamento de books e exemplaryes
- **Circulation**: Controle de empréstimos e devoluções
- **Users**: Gestão de usuários do sistema
- **Reports**: Relatórios e estatísticas da biblioteca

## Como executar

### Requisitos

- Node.js 16+
- Yarn
- Docker e Docker Compose (para execução em contêineres)
- PostgreSQL (para execução local sem Docker)

### Desenvolvimento local

1. Clone o repositório
2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente (.env)

```bash
# Exemplo de .env.development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ltclaro_library?schema=public"
```

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
yarn dev
```

6. Acesse a documentação Swagger em: http://localhost:3000/api

### Executando com Docker Compose

```bash
docker compose up
```

### Executando testes

```bash
# Testes unitários
yarn test

# Testes e2e
yarn test:e2e

# Cobertura de testes
yarn test:cov
```

## Implantação

### Google Cloud Platform (GCP)

O projeto inclui um arquivo Terraform (`main.tf`) para provisionar:

- Cloud Run para hospedar a aplicação
- Cloud SQL (PostgreSQL) para o banco de dados
- Rede VPC e conectores necessários

Para implantar:

1. Configure o Google Cloud SDK localmente
2. Inicialize o Terraform:

```bash
terraform init
```

3. Aplique a configuração:

```bash
terraform apply -var="project_id=seu-projeto-gcp"
```

## Licença

Este projeto está licenciado sob a licença MIT.