var crypto = require('crypto')
  , fs = require('fs');

var kruptosUtilCrypt = {
  encryptText:function (text, key) {
    var cipher = crypto.createCipher('aes-256-cbc', key)
      , crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decryptText:function (text, key) {
    var decipher = crypto.createDecipher('aes-256-cbc', key)
      , dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  },
  encryptFileSync:function (file, destFile, key) {
    var decryptedContent = fs.readFileSync(file)
      , encryptedContent = kruptosUtilCrypt.encryptText(decryptedContent, key);
    fs.writeFileSync(destFile, encryptedContent);
  },
  decryptFileSync:function (file, destFile, key) {
    var encryptedContent, decryptedContent;
    if (key === undefined) {
      key = destFile;
      destFile = null;
    }
    encryptedContent = fs.readFileSync(file);
    decryptedContent = kruptosUtilCrypt.decryptText(encryptedContent, key);
    if (destFile === null) {
      return decryptedContent;
    } else {
      fs.writeFileSync(destFile, decryptedContent);
    }
  }
};

module.exports = kruptosUtilCrypt;