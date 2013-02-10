var name = 'module2'
  , module1 = require('./module1');

console.log('This is %s!', name);
console.log('In module2, module1.name : %s', module1.name);

module.exports = {
  name:name
};