declare namespace renderGif {
	export interface ReturnValue {
		/** Whether the animation should be rendered and provided to the callback. */
		isPlaying: boolean
	}

	export interface Options {
		/** The maximum framerate to render the gif at. */
		maximumFrameRate?: number
	}
}

/**
Render a gif and provide frames to draw.
@param data The gif data. Can be anything array-like such as a Buffer, Array or Uint8Array.
@param callback The callback to provide each rendered frame to. The data is a png encoded as a Uint8ClampedArray.
@param options Options.
@example
```
const fs = require("fs");
const renderGif = require("render-gif");
const renderFrame = require("./render-frame");

renderGif(fs.readFileSync("unicorn.gif"), renderFrame);
```
*/
declare function renderGif(data: ArrayLike<number>, callback: (data: ArrayLike<number>) => void, options: renderGif.Options): renderGif.ReturnValue

export = renderGif
