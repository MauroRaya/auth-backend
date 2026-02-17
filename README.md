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
git clone https://github.com/MauroRaya/auth-backend
```

### 2. Mude para a branch de desenvolvimento.
```bash
git checkout development
```

### 3. Configure o arquivo `.env` na raiz do projeto.
```bash
JWT_SECRET=your-jwt-secret
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_DB=postgres
PORT=3000
```

### 4. Instale as dependências.
```bash
npm i
```

### 5. Suba o banco de dados localmente.
```bash
docker compose up -d
```

> Não esqueça de executar `docker compose down` após finalizar a aplicação.

### 6. Inicie a aplicação.
```bash
npm start
```

## 🗑️ [Code smells](https://pt.wikipedia.org/wiki/Code_smell)

É um indício de um **possível problema no design do código**, mesmo que ele funcione.  
Abaixo estão alguns exemplos frequentes em codebases:

### [Obsessão de primitivos](https://refactoring.guru/pt-br/smells/primitive-obsession)

É uma tendência de usar [tipos de dados primitivos](https://developer.mozilla.org/pt-BR/docs/Glossary/Primitive) para representar dados complexos que possuem regras próprias do domínio.  
Essa prática geralmente acaba resultando em sintomas como:
* [Código boilerplate](https://pt.wikipedia.org/wiki/Boilerplate_code)
* Código de validação duplicado

#### Exemplo:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  // Código boilerplate
  function assertIdade(idade: number) {
    if (idade < 18) {
      throw new Error("Usuário deve ser maior de idade");
    }
  }

  async function criarUsuario(nome: string, idade: number) {
    assertIdade(idade); // Validação duplicada
    await this.repositorio.criar(nome, idade);
  }

  async function atualizarUsuario(nome: string, idade: number) {
    assertIdade(idade); // Validação duplicada
    await this.repositorio.atualizar(nome, idade);
  }
}
```

#### Tratamento:

Uma prática comum é realizar a validação durante a entrada de dados.

##### 1. Configurar a validação do NestJS e class-validator

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Configura a validação

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
```

##### 2. Criar uma classe utilizando os decoradores do class-validator.

```typescript
import { IsInt, Min } from 'class-validator';

export class CriarUsuarioDto {
  nome: string;

  @IsInt()
  @Min(18)
  idade: number;
}
```

##### 3. Refatorar o parâmetro da função.

```typescript
import { Body, Controller, Post, Put } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  @Post()
  async criarUsuario(@Body() dto: CriarUsuarioDto) {
    const { nome, idade } = dto;
    await this.usuariosService.criarUsuario(nome, idade);
  }

  @Put()
  async atualizarUsuario(@Body() dto: CriarUsuarioDto) {
    const { nome, idade } = dto;
    await this.usuariosService.atualizarUsuario(nome, idade);
  }
}
```

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