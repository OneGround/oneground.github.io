# OneGround Development Portal

Source code for [dev.oneground.nl](https://dev.oneground.nl) development portal.

This website is built using [Docusaurus](https://docusaurus.io/).

## Run Locally

### Packages Installation

```
$ npm install
```

Before you begin, make sure to install all packages using this command.

### Start Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Format Code

```
$ npm run format
```

Before creating a new commit or pull request, ensure all code is formatted using this command. This is necessary because our pull request build will fail if the code is not properly formatted.

Source code is formatted using [Prettier](https://prettier.io/).
