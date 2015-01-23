# entitlements [![Build Status](http://img.shields.io/travis/matiassingers/entitlements.svg?style=flat-square)](https://travis-ci.org/matiassingers/entitlements) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/entitlements.svg?style=flat-square)](https://gemnasium.com/matiassingers/entitlements)
> check the entitlements of a .app bundle

## Install

```sh
$ npm install --save entitlements
```


## Usage

```js
var entitlements = require('entitlements');

entitlements('./Payload/Facebook.app/', function(error, data){
  console.log(data);
  // => { "application-identifier": "com.facebook.facebook",
  //      "get-task-allow": false,
  //      ... }
});

```


## CLI

```sh
$ npm install --global entitlements
```

```sh
$ entitlements --help

  check the entitlements of a .app bundle

  Example
    entitlements ./Payload/Facebook.app/

    => { "application-identifier": "com.facebook.facebook",
         "get-task-allow":false,
         ... }
```


## License

MIT © [Matias Singers](http://mts.io)
