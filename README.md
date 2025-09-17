# Thrivos

<h2 align="center">
   <a href="#description">Description</a> |
   <a href="#installation">Installation</a> |
   <a href="#how-to-execute">How to Execute</a> |
   <a href="#license">License</a> |
   <a href="#resources">Resources</a>
</h2>

## Description
+ This project is made using TypeScript.
+ Extensions and libraries used include: Prettier, ESLint and DaysJS.
+ We use Error Lens as a VS Code extension for QoL.
+ We use GitHub Actions for CI/CD. Tests run programmatically at 10, 12, 16 and 20 UTC.
+ Every test is currently executed in Staging only.
+ Tests should be run headless unless you are debugging.

Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

## Installation<a id="installation"></a>

Install dependencies

npm i

## How to Execute<a id="how-to-execute"></a>

Run all tests

npx playwright test 

Show Report

npx playwright show-report

Run tests in a specific folder

npx playwright test <folder>


i.e. Marketing

npx playwright test src/test/marketing


## License<a id="license"></a>
+ The information contained in this repo is private and might not be copied, shared or distributed under any circumstances. 

## Resources<a id="resources"></a>
https://playwright.dev/
https://www.typescriptlang.org/docs/
https://www.w3schools.com/xml/xpath_syntax.asp
https://devhints.io/xpath