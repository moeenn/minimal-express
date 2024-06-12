# Minimal Express

## Setup
```bash
# install dependencies
$ npm i -D

# perform initial build
$ npm run build
```


#### Setting up environment
An example file for environment variables is provided. It can be copied to define actual environment variables.

```bash
# create a new .env file from .env.example file
$ cp .env.example .env
```

**Note**: The `.env` file will be loaded during development and testing. It will not be loaded in production. If you require that `.env` file be loaded in production environment as well, please update the `package.json` scripts accordingly.


#### Generating security keys
The application depends of security keys to operate securely. They must be defined inside the `.env` file. A script has been included for easily generate these keys. Run the following command to generate a crypt-random key.

```bash
$ npm run gen:secret
```


#### Run in Development Mode
```bash
$ npm run start:dev
```


#### Running Tests with Jest
```bash
$ npm test
```

#### Run in Production Mode
```bash
$ npm run build
$ npm run start:prod
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.


#### Serving static files
The web server has been setup to server static files. This behavior is not enabled by default but can be enabled by updating `src/config.ts` file and setting `server.public.exposePublicFolder` to `true`.

The web server has been setup to server static files from `public` folder located at the root of the project. These files will be served from root url of the server. E.g. File `public/manifest.json` will be served at `https://domain.com/manifest.json`.


#### TODO

- [ ] Enable rate-limiting
- [ ] Add health-check end-points