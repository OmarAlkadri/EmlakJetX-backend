<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).







# Final Project Structure for DDD with Clean Architecture

This structure is designed to integrate Clean Architecture principles with Domain-Driven Design (DDD). Below is the folder hierarchy and an explanation of each layer and component.

---

## Folder Structure
```plaintext
project-root/
├── config/
│   ├── env/
│   │   ├── development.yaml
│   │   ├── production.yaml
│   │   └── testing.yaml
│   └── app-config.ts
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── EntityName.ts
│   │   │   └── index.ts
│   │   ├── value-objects/
│   │   │   ├── ValueObjectName.ts
│   │   │   └── index.ts
│   │   ├── aggregates/
│   │   │   ├── AggregateRootName.ts
│   │   │   └── index.ts
│   │   └── repositories/
│   │       ├── IRepository.ts
│   │       └── index.ts
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── UseCaseName.ts
│   │   │   └── index.ts
│   │   ├── dtos/
│   │   │   ├── DtoName.ts
│   │   │   └── index.ts
│   │   └── interfaces/
│   │       ├── IServiceInterface.ts
│   │       └── index.ts
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   ├── RepositoryImplementation.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── ExternalServiceName.ts
│   │   │   └── index.ts
│   │   └── database/
│   │       ├── PrismaClient.ts
│   │       └── migrations/
│   │           └── init.sql
│   ├── presentation/
│   │   ├── controllers/
│   │   │   ├── ControllerName.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── RouteName.ts
│   │   │   └── index.ts
│   │   └── middlewares/
│   │       ├── MiddlewareName.ts
│   │       └── index.ts
│   └── shared/
│       ├── utils/
│       │   ├── utilityName.ts
│       │   └── index.ts
│       ├── constants/
│       │   ├── constants.ts
│       │   └── index.ts
│       └── types/
│           ├── CustomType.ts
│           └── index.ts
└── README.md
```

---

## Explanation of Layers

### 1. **Config**
- Stores configuration files, including environment variables and global application settings.

### 2. **Domain**
- **Entities**: Represent core business objects with attributes and behaviors.
- **Value Objects**: Represent immutable domain concepts (e.g., Currency).
- **Aggregates**: Groups of entities treated as a single unit.
- **Repositories**: Interfaces for data access to abstract the infrastructure layer.

### 3. **Application**
- **Use Cases**: Encapsulate application-specific business rules.
- **DTOs**: Data Transfer Objects used between layers.
- **Interfaces**: Contracts for services and other dependencies.

### 4. **Infrastructure**
- **Repositories**: Concrete implementations of repository interfaces.
- **Services**: Communication with external APIs or integrations.
- **Database**: ORM setup, migrations, and database connections.

### 5. **Presentation**
- **Controllers**: Handle incoming requests and route them to use cases.
- **Routes**: Define API endpoints.
- **Middlewares**: Apply cross-cutting concerns like authentication and logging.

### 6. **Shared**
- Common utilities, constants, and types shared across the project.

---

## Image for README
The image illustrates the clean architecture flow, showing dependencies between layers, the direction of control, and the interaction of components.
