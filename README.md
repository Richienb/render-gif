# render-gif [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/render-gif/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/render-gif)

Render a gif and provide frames to draw.

[![NPM Badge](https://nodei.co/npm/render-gif.png)](https://npmjs.com/package/render-gif)

## Install

```sh
npm install render-gif
```

## Usage

```js
const fs = require("fs");
const renderGif = require("render-gif");
const renderFrame = require("./render-frame");
 
renderGif(fs.readFileSync("unicorn.gif"), renderFrame);
```

## API

### renderGif(data, callback, options?)

#### data

Type: `array-like`

The gif data. Can be anything array-like such as a Buffer, Array or Uint8Array.

#### callback

Type: `(data: ArrayLike) => void`

The callback to provide each rendered frame to. The data is a png encoded as a Uint8ClampedArray.

#### options

Type: `object`

##### maximumFrameRate

Type: `number`\
Default: `Infinity`

The maximum framerate to render the gif at.

#### Return value

##### isPlaying

Type: `boolean`\
Default: `true`

Whether the animation should be rendered and provided to the callback.
