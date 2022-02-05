<div align="center">
  <h1>
  sodium-randbytes
  </h1>
</div>
<hr/>
<div>
  <a href="https://www.npmjs.com/package/sodium-randbytes" target="_blank">
  <img src="https://img.shields.io/npm/v/sodium-randbytes" />
  </a>
  <a href="https://app.travis-ci.com/Zilliqa/sodium-randbytes" target="_blank">
  <img src="https://app.travis-ci.com/Zilliqa/sodium-randbytes.svg?branch=main" />
  </a>
  <a href="https://codecov.io/gh/Zilliqa/sodium-randbytes" target="_blank">
  <img src="https://codecov.io/gh/Zilliqa/sodium-randbytes/branch/main/graph/badge.svg?token=WWDI2IW4Dn" />
  </a>
  <a href="LICENSE" target="_blank">
  <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
  </a>
</div>
<br/>

It uses `randombytes_buf` of [`sodium-native`](https://github.com/sodium-friends/sodium-native) in Node and [`Crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) in the browser.

## Installation

```sh
npm i sodium-randbytes
# or
yarn add sodium-randbytes
```

## Usage

```ts
import randomBytes from "sodium-randbytes";

// get 20 random bytes
const result = randomBytes(20);
```

## License

This project is open source software licensed as [GPL-3.0](./LICENSE).
