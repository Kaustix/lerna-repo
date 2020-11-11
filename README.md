# Lerna Example Repo
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A collection of shared JavaScript libraries.

This project is built as a mono repo using [Lerna](https://github.com/lerna/lerna).
For more examples or setup help, please check out the documentation.

## Installing

`npm i`

Installs all npm package dependencies in the root and in all packages.

## Deploying

To publish any packages run the following command to start the publish CLI which will check for any changes and ask for the new packer version number then publish the package to azure artifacts

`npm run publish`

This command will run the following step in order
  - Runs Tests
  - Checks code linting and formating
  - Builds each package
  - Lerna Publish CLI + Publishing

## Testing

Runs Jest tests in all pacakges

`npm run test`

## Linting and Formatting

This project uses ESLint for Linting and Prettier for Code Formatting, if you would like to know more about the difference between then two please check out [Difference Between Linters and Pretier](https://prettier.io/docs/en/comparison.html)

### Change Linting/Formatting Rules

- Change ESLint rules in .eslintrc.js
- Change Prettier rules in .prettierrc

### Recommended VSCODE Extensions and Settings

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- In Settings Check/Tick Editor: Format on Save

## How to make a new Package

  - Run the following command at the root of the project to create a new package `lerna create package_name`
  - Copy the same package.json configuration as another package (rollup + jest scripts)
  - `npm install jest rollup --save-dev`
  - copy jest.config.js
  - copy rollup.config.js
  - edit both files if anything needs to be changed
  - HAPPY CODING