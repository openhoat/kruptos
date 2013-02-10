## What's kruptos ?

Encrypt and decrypt node files with a simple command-line.
Provides a wrapper to 'require' encrypted node modules.

## Installation

The recommended way is through the excellent [NPM](http://www.npmjs.org/):

    $ npm install -g kruptos

## Command line usage

Encrypt demo/module1.js and demo/module2.js with 'mysecretkey' key :

    $ kruptos -e -k mysecretkey demo/module*.js

Decrypt demo/module1.js.encrypted and demo/module2.js.encrypted with 'mysecretkey' key :

    $ kruptos -d -k mysecretkey demo/module*.encrypted

## Module require usage

Simply add the kruptos module at the top of your main script (app.js for example) :

    require('kruptos');

Run application as usual :

    $ node app

Run application and encrypt all module dependencies :

    $ node app --encrypt --key mysecretkey

Run application directly with encrypted module dependencies :

    $ node app --key mysecretkey

Run application and decrypt all module dependencies :

    $ node app --decrypt --key mysecretkey

## Demo

Use the samples provided in the [demo directory](https://github.com/openhoat/kruptos/tree/master/demo).
There are two encrypted modules based on [sources directory](https://github.com/openhoat/kruptos/tree/master/demo/sources).
Try to execute the main script, and see how it works :

    $ node demo/main --key demokey

To decrypt the modules during the execution :

    $ node demo/main --decrypt --key demokey

To encrypt the modules during the execution :

    $ node demo/main --encrypt --key demokey


Enjoy !
