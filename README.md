# Minimal Express

## Setup
```bash
# install dependencies
$ npm i -D

# perform initial build
$ npm run build

# create a new .env file
$ cp .env.example .env

# generate secret. (Note: add secret as JWT_SECRET to .env file)
$ npm run gen:secret
```


## Run in Development Mode
```bash
$ npm run start:dev
```


## Running Tests with Jest
```bash
$ npm run test
```


## Run in Production Mode
```bash
$ npm run build
$ npm run start:prod
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.
