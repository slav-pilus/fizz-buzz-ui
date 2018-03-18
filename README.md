# FizzBuzzUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
This project have a sister project [fizz-buzz-backed](https://github.com/slavP/fizz-buzz-backend) that can be used to provide backend functionality.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Example

Live demo of the project is deployed [here](http://fizz-buzz-ui.s3-website.eu-west-2.amazonaws.com/)

## Design decision made

 - As this is very simple project with limited functionality only single view component is used for the front end.
 - The form definition of the component is done by using reactive form approach.
 - Bootstrap 4 is front end css framework (no js dependencies are included)
 - The backend functionality is accessed by means of `FizzBuzzService` that makes rest call to the back-end server and return an Observable of `FizzBuzzResonse` object. 

