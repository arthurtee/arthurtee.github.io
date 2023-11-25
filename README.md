# arthurtee.github.io

This is a resume project for my personal profile.
Design inspired by [template](https://sampleresumetemplate.net/).
Automated tests are setup by me with [ChatGPT](https://chat.openai.com/).
Parallel tests are executed in a single file with separate worker processes for efficiency.

### How to run the automated tests? 
* Select your preferred development environment.
* Git clone this project. 
* Install Playwright and documentation can be found [here](https://playwright.dev/docs/intro).
* Install [nodejs](https://nodejs.org/en).
  * Install project dependencies: ```npm i```
* Start local server: ```ts-node server.ts```
* Start a new terminal to run the automated tests in playwright directory with below [modes](playwright/package.json):
  *  ```npm run test``` : run tests without loading the browser's UI.
  *  ```NODE_ENV=prod npm run test:show``` : run tests by loading the browser's UI in Production.
  *  ```npm run test:show``` : run tests by loading the browser's UI in local development.
  *  ```npm run test:multi```: run tests with all browsers.