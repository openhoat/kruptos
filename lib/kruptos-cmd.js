var path = require('path')
  , colors = require('colors')
  , commander = require('commander')
  , pkg = require('../package.json')
  , kruptosUtilCrypt = require('./kruptos-util-crypt')
  , kruptosUtil = require('./kruptos-util')
  , files, key, encryptedExtension, defaultEncryptedExtension = '.encrypted';

commander
  .version(pkg.version)
  .usage('[options] <file ...>')
  .option('-e, --encrypt', 'encrypt file')
  .option('-d, --decrypt', 'decrypt file')
  .option('-k, --key <value>', 'secret key used to encrypt and decrypt')
  .option('-x, --extension <value>', 'extension suffix for encrypted files (default is "' + defaultEncryptedExtension + '")')
  .parse(process.argv);

files = commander.args;
key = commander.key;
encryptedExtension = commander.extension || defaultEncryptedExtension;

if (files.length === 0) {
  kruptosUtil.error('%s : please specify at least one file (type -h for usage)', 'Error'.red);
  process.exit(1);
}

if (!commander.key) {
  kruptosUtil.error('%s : please specify a key parameter (type -h for usage)', 'Error'.red);
  process.exit(1);
}

files.forEach(function (file) {
  var destFile;
  if (file.indexOf('*') !== -1) {
    kruptosUtil.error('%s : ignoring file %s', 'Error'.red, file.red);
    return;
  }
  if (commander.encrypt) {
    destFile = file + encryptedExtension;
    kruptosUtil.print('Encrypting file %s to %s :...', file.green, destFile.yellow);
    kruptosUtilCrypt.encryptFileSync(file, destFile, key);
    kruptosUtil.println('OK'.blue);
  } else if (commander.decrypt) {
    destFile = file.substring(0, file.length - encryptedExtension.length);
    kruptosUtil.print('Decrypting file %s to %s :...', file.yellow, destFile.green);
    kruptosUtilCrypt.decryptFileSync(file, destFile, key);
    kruptosUtil.println('OK'.blue);
  }
});

