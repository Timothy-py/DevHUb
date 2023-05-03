# DevHUb BACKEND API

## Description

DevHub is a web-based application that provides an interface for managing developers' information. The application provides functionalities such as creating, editing, viewing, and deleting developers. DevHub is a tool that can be used by companies to manage their developer resources efficiently.

## APPS

### Developer Resource

## API Functionalities

- Create a developer
- Get a developer detail
- Get all developers
- Filter developers by level
- Edit a developer details
- Delete a developer

## Tech Stacks

- Language -> Typescript (Node.js)
- Backend Framework -> Nestjs
- Database -> PostgreSQL
- ORM - > TypeORM
- Cache -> Redis
- Container -> Docker and Docker-compose
- Test - E2E with Pactum

## Installation

```bash
$ npm install
```

## Environment Setup

Create '.env' file in the root directory and use the '.env.sample' file to add the necessary configurations.

## Running the app

```bash
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

# Start Commands for docker-compose file

`docker-compose up`

# Start Commands for Docker

Build your image:  
`docker build <your path> -t <<user>/project-name>`

Run:  
`docker run -p 8080:3000 <<user>/project-name>`

## Swagger API

```
http://localhost:3000/api/doc
```

## Stay in touch

- _contact me @ adeyeyetimothy33@gmail.com_
