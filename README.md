# tty-width-frame

[![npm version](https://img.shields.io/npm/v/tty-width-frame.svg)](https://www.npmjs.com/package/tty-width-frame)
[![Build Status](https://travis-ci.com/shinnn/tty-width-frame.svg?branch=master)](https://travis-ci.com/shinnn/tty-width-frame)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/tty-width-frame.svg)](https://coveralls.io/github/shinnn/tty-width-frame?branch=master)

Generate simple framed text fitting for the current text terminal

```javascript
const ttyWidthFrame = require('tty-width-frame');

console.log(ttyWidthFrame(`tty-width-frame
Generate simple framed text from a string`));
```

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│ tty-width-frame                                                          │
│ Generate simple framed text from a string                                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

* No configuration, a single tidy default
  * Single-line border
  * 1 padding between text and borders
  * 2 horizontal spaces on both side of the box
  * Left-aligned text
* Automatic box width adjustment for the current terminal width
* Automatic line breaking for long text

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install tty-width-frame
```

## API

```javascript
const ttyWidthFrame = require('tty-width-frame');
```

### ttyWidthFrame(*input*)

*input*: `string`  
Return: `string`

```javascript
// When the terminal width is 30

ttyWidthFrame('abcdefghijklmnopqrstuvwxyz');
/* =>
  ┌────────────────────────┐
  │                        │
  │ abcdefghijklmnopqrstuv │
  │ wxyz                   │
  │                        │
  └────────────────────────┘
*/

// When the terminal width is 20

ttyWidthFrame('abcdefghijklmnopqrstuvwxyz');
/* =>
  ┌──────────────┐
  │              │
  │ abcdefghijkl │
  │ mnopqrstuvwx │
  │ yz           │
  │              │
  └──────────────┘
*/
```

When the terminal window is too narrow, or more specifically, its width is less than 15, it just returns the original `string`.

```javascript
// When the terminal width is 14

ttyWidthFrame('abcdefghijklmnopqrstuvwxyz'); //=> 'abcdefghijklmnopqrstuvwxyz'
```

On a [non-interactive](https://www.tldp.org/LDP/abs/html/intandnonint.html) script, it throws an `Error` instead.

## Related project

* [neat-frame](https://github.com/shinnn/neat-frame) – works on both TTY and non-TTY environments, in exchange for larger dependency size

## License

[ISC License](./LICENSE) © 2018 - 2019 Watanabe Shinnosuke
