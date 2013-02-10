require('../lib/kruptos-module');

var module1 = require('./module1')
  , module2 = require('./module2');

console.log('In main, module1.name : %s', module1.name);
console.log('In main, module2.name : %s', module2.name);
