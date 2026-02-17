# API de autenticação
API responsável por autenticação de usuários, construída com TypeScript e NestJS.

## 📌 Tabela de conteúdo
* [Tecnologias](#-tecnologias)
* [Pré-requisitos](#-pré-requisitos)
* [Convenções](#️-convenções)
* [Como executar o projeto](#️-como-executar-o-projeto)
* [Code smells](#️-code-smells)
* [Como contribuir](#-como-contribuir)

## 🚀 Tecnologias
* [TypeScript](https://www.typescriptlang.org/)
* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [class-validator](https://github.com/typestack/class-validator)
* [class-transformer](https://github.com/typestack/class-transformer)
* [Swagger](https://swagger.io/)
* [Jest](https://jestjs.io/)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)

## 📋 Pré-requisitos
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/pt-br)
* [NestJS CLI](https://docs.nestjs.com/cli/overview)
* [Docker](https://docs.docker.com/get-started/docker-overview/)
* [Docker compose](https://docs.docker.com/compose/)

## ✍️ Convenções
Esse repositório adota as especificações de:
* [Branches convencionais](https://conventional-branch.github.io/pt-br/)
* [Commits convencionais](https://www.conventionalcommits.org/pt-br/v1.0.0/)

## ⚙️ Como executar o projeto

### 1. Clone o repositório.
```bash
git clone https://github.com/MauroRaya/auth-backend -b dev
```

### 2. Configure o arquivo `.env` na raiz do projeto.
```bash
# Apenas um exemplo, arquivo sujeito a mudanças

JWT_SECRET=your-jwt-secret
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_DB=postgres
PORT=3000
```

> **IMPORTANTE**  
> Para descobrir as variáveis de ambiente necessárias para execução do projeto, visite o arquivo `env.ts`

```bash
.
└── src
    └── env
        ├── env.module.ts
        ├── env.service.ts
        ├── env.ts
        └── env.validate.ts
```

### 3. Instale as dependências.
```bash
npm i
```

### 4. Suba o banco de dados localmente.
```bash
docker compose up -d
```

### 5. Inicie a aplicação.
```bash
npm start
```

> **IMPORTANTE**  
> Não esqueça de executar `docker compose down` após finalizar a aplicação.

## 🗑️ [Code smells](https://pt.wikipedia.org/wiki/Code_smell)

Um code smell é um indício de um **possível problema no design do código**, mesmo que ele funcione.  
Abaixo estão alguns exemplos comuns

## 🤝 Como contribuir

### 1. Clone o repositório.

```bash
git checkout https://github.com/MauroRaya/auth-backend -b <nome-da-minha-branch>
```

### 2. Instale as dependências.
```bash
npm i
```

### 3. Adicione dependências caso necessário.
### 4. Adicione uma funcionalidade, corrija um bug ou refatore um trecho de código.
### 5. Escreva e atualize testes conforme necessário.
### 6. Atualize a documentação caso necessário.
### 7. Abra um pull request no GitHub.