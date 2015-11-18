Monty Hall JS  [![Build Status](https://travis-ci.org/edj-boston/monty-hall-js.svg?branch=master)](https://travis-ci.org/edj-boston/monty-hall-js) [![Dependency Status](https://david-dm.org/edj-boston/monty-hall-js.svg)](https://david-dm.org/edj-boston/monty-hall-js)[![devDependency Status](https://david-dm.org/edj-boston/monty-hall-js/dev-status.svg)](https://david-dm.org/edj-boston/monty-hall-js#info=devDependencies)
=============

A Monty Hall problem simulator.


Install
-------

```sh
npm install monty-hall
```


Example
-------

```js
var MontyHall = require('monty-hall');

var m = new MontyHall(10000);

console.log(m.results);
```