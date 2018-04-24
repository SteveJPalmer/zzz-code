# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.


## My additional notes

###Integrate: Modernizr
 
_cf files:_  package.json
             ./assets/modernizr.js,
             @types/modernizr, 
             tsconfig.app.js ("types"),
             angluar-cli.json ("scripts"),
             app.component.ts (ngOnInit),


### Integrate: Lodash
_cf files:_  package.json,
             @types/lodash,
             app.component.ts (ngOnInit),


### Integrate: lite-server

1st terminal - CLI Build with watch 

`ng build --watch`

2nd terminal - Http Server with watch and live-refresh _(default)_

`node_modules\.bin\lite-server --baseDir=".\dist"`

_or via script:_ `npm run lite-server`



### Integrate: Material
_cf files:_  app.module.ts,
             app.material.module.ts
             styles.css,
             index.html


### Integrate: Bootstrap
_cf files:_  .angular-cli.json




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
