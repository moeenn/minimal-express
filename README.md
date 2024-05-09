# Typescript Sandbox
A Typescript sandbox with following tools already setup
- Typescript for type-checking i.e. ```tsc```
- ```swc``` for code compilation
- ```eslint``` for static analysis and linting
- ```jest``` for testing
- Some basic ```package.json``` scripts

## Setup
```bash
$ npm i --save-dev
```

## Run in Development Mode
```bash
$ npm run dev
```

## Run in Production Mode
```bash
$ npm run build
$ npm run start
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.

## Linting with ESLint
```bash
$ npm run lint
```

## Running Tests with Jest
```bash
$ npm run test
```
