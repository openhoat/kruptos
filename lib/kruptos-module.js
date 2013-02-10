var Module = require('module')
  , path = require('path')
  , kruptosUtil = require('./kruptos-util')
  , kruptosUtilCrypt = require('./kruptos-util-crypt')
  , encryptedFileExtension = '.encrypted'
  , _Module = {
    _findPath:Module._findPath,
    wrap:Module.wrap
  }
  , config = {
    encryptMode:false,
    decryptMode:false,
    cryptKey:null
  };

if (kruptosUtil.argsContain('--encrypt')) {
  config.encryptMode = true;
} else if (kruptosUtil.argsContain('--decrypt')) {
  config.decryptMode = true;
}

config.cryptKey = kruptosUtil.argsValue('--key');

var moduleEncryptedFileExtension = function (module, filename) {
  var decryptedFilename = filename.substring(0, filename.length - encryptedFileExtension.length)
    , extension = path.extname(decryptedFilename) || '.js';
  return Module._extensions[extension](that, decryptedFilename);
};

for (var extension in Module._extensions) {
  Module._extensions[extension + encryptedFileExtension] = moduleEncryptedFileExtension;
}

Module.wrap = function (content) {
  var decryptedContent, that = this;
  if (config.cryptKey !== null && !config.encryptMode && !config.decryptMode) {
    decryptedContent = kruptosUtilCrypt.decryptText(content, config.cryptKey);
    return _Module.wrap.apply(that, [decryptedContent]);
  }
  return _Module.wrap.apply(that, arguments);
};

Module._findPath = function (request, paths) {
  var that = this, filename, encryptedFilename, cacheKey;
  if (request.charAt(0) === '/') {
    paths = [''];
  }
  cacheKey = JSON.stringify({request:request, paths:paths});
  if (Module._pathCache[cacheKey]) {
    return Module._pathCache[cacheKey];
  }
  filename = _Module._findPath.apply(that, arguments);
  if (config.encryptMode || config.decryptMode) {
    if (config.decryptMode) {
      if (kruptosUtil.endsWith(filename, encryptedFileExtension)) {
        encryptedFilename = filename;
        filename = encryptedFilename.substring(0, filename.length - encryptedFileExtension.length);
        kruptosUtilCrypt.decryptFileSync(encryptedFilename, filename, config.cryptKey);
        Module._pathCache[cacheKey] = filename;
      }
    } else {
      encryptedFilename = filename + encryptedFileExtension;
      kruptosUtilCrypt.encryptFileSync(filename, encryptedFilename, config.cryptKey);
    }
  }
  return filename;
};