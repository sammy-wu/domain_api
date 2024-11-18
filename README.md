# REST API and GraphQL API Server for users, listings and saved listings

## Overview

A REST API and A GraphQL API using Node.js, Express.js, TypeScript, Postgresql, TypeORM and Type-GraphQL
to perform CRUD operations on users and their saved listings.

## Architecture

https://excalidraw.com/#json=AzeVzZBgIKcsoT3sLZaEf,CUlSoj5v_cyA8L4jcp8C5w

    rest api
             \
              services --> models and TypeORM --> postgresql database 
             / 
    graphql api

## Requirements

- Node.js and npm
- PostgreSQL database

## Setup Instructions

1.  cd domain_api
2.  npm install
3.  Configure the database:
    Create a .env file in the root directory and add PostgreSQL credentials:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

4. Run the server

npm run dev

The server will run on http://localhost:8000.
Both rest api and graphql api will serve on this port.
GraphQL endpoint: http://localhost:8000/graphql

## Graphql schema
schema.graphql will be generated automatically by TYPE-GRAPHQL.

## Test

To run tests: npm run test

To run tests with coverage: npm run test:coverage

TODO: use an in-memory database to speed up.

## Lint and Format

    •	To lint the code:

npm run lint

    •	To format the code:

npm run format

## Code Coverage

A code coverage report will be generated in the coverage directory after running:

npm run test:coverage

## Tools Used

    •	Node.js
    •	ExpressJS
    •	TypeScript
    •	TypeORM
    •	PostgreSQL
    •	Jest
    •	Supertest
    •	ESLint
    •	Prettier
    •	ts-node-dev
    •	dotenv
    •	Apollo GraphQL
    •	Type-GraphQL

