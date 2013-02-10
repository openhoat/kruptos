var util = require('util');

var kruptosUtil = {
  startsWith:function (s, startString) {
    return s.indexOf(startString) === 0;
  },
  endsWith:function (s, endString) {
    return s.indexOf(endString) === s.length - endString.length;
  },
  argsContain:function (argName) {
    var args = Array.prototype.slice.apply(process.argv);
    for (var i = 0; i < args.length; i++) {
      if (args[i] === argName) {
        return true;
      }
    }
    return false;
  },
  argsValue:function (argName) {
    var args = Array.prototype.slice.apply(process.argv);
    for (var i = 0; i < args.length; i++) {
      if (args[i] === argName) {
        return args[i + 1];
      }
    }
    return null;
  },
  print:function (format, str) {
    var argumentsArray;
    if (str === undefined) {
      str = format;
      format = null;
    } else {
      argumentsArray = Array.prototype.slice.apply(arguments);
      str = util.format.apply(this, argumentsArray);
    }
    util.print(str);
  },
  println:function (format, str) {
    var argumentsArray;
    if (str === undefined) {
      str = format;
      format = null;
    } else {
      argumentsArray = Array.prototype.slice.apply(arguments);
      str = util.format.apply(this, argumentsArray);
    }
    util.print(str);
    util.print('\n');
  },
  error:function (format, str) {
    var argumentsArray;
    if (str === undefined) {
      str = format;
      format = null;
    } else {
      argumentsArray = Array.prototype.slice.apply(arguments);
      str = util.format.apply(this, argumentsArray);
    }
    util.error(str);
  }
};

module.exports = kruptosUtil;