# entitlements [![Tests](https://github.com/matiassingers/entitlements/actions/workflows/test.yml/badge.svg)](https://github.com/matiassingers/entitlements/actions/workflows/test.yml)
> check the entitlements of a .app bundle

## Install

Requires Node.js 18.18 or newer and macOS.

```sh
$ npm install --save entitlements
```


## Usage

```js
var entitlements = require('entitlements');

entitlements('./Payload/Facebook.app/', function(error, data){
  if(error){
    throw error;
  }

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


## Related

- [`grunt-xcode`](https://github.com/matiassingers/grunt-xcode)
- [`apn-test`](https://github.com/matiassingers/apn-test)
- [`ipa-metadata`](https://github.com/matiassingers/ipa-metadata)
- [`provisioning`](https://github.com/matiassingers/provisioning)


## License

MIT © [Matias Singers](http://mts.io)
