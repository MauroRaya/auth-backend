# API de autenticação
API responsável por autenticação de usuários, construída com TypeScript e NestJS.

## 📌 Tabela de conteúdo
* [Tecnologias](#-tecnologias)
* [Pré-requisitos](#-pré-requisitos)
* [Convenções](#️-convenções)
* [Arquitetura](#️-arquitetura)
  * [Variáveis de ambiente](#variáveis-de-ambiente)

## 🚀 Tecnologias
* [TypeScript](https://www.typescriptlang.org/)
* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [class-validator](https://github.com/typestack/class-validator)
* [class-transformer](https://github.com/typestack/class-transformer)
* [Swagger](https://swagger.io/)
* [Jest](https://jestjs.io/)
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

## 🏗️ Arquitetura

### Variáveis de ambiente

#### Problema
O `ConfigService` padrão permite **acessar qualquer variável de ambiente, mesmo que ela não exista**, o que pode causar **erros em tempo de execução**.

#### Solução
O `EnvService` atua como um *wrapper* tipado do `ConfigService`, **garantindo segurança em tempo de compilação**.

#### Exemplo de uso
```typescript
// src/env/env.ts
import { IsNotEmpty } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  FOO: string;
}
```

```typescript
// src/example/example.service.ts
import { EnvService } from 'src/env/env.service';

@Injectable()
export class ExampleService {
  constructor(private readonly envService: EnvService) {}

  success(): string {
    return this.envService.get<string>('FOO');
  }

  failure(): string {
    // Erro durante compilação, 'BAR' não é uma chave de EnvironmentVariables
    return this.envService.get<string>('BAR');
  }
}
```