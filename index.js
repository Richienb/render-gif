"use strict"

const Jimp = require("jimp")
const Cycled = require("cycled")
const debounceFunction = require("debounce-fn")
const delay = require("delay")
const decodeGif = require("decode-gif")

module.exports = (data, callback, { maximumFrameRate = Infinity } = {}) => {
	if (typeof maximumFrameRate !== "number") {
		throw new TypeError(`Expected \`maximumFrameRate\` to be a number, got ${typeof maximumFrameRate}`)
	}

	const { width, height, frames: gifFrames } = decodeGif(data)

	let image

	const renderGifFrame = async ({ data, width, height }) => {
		if (!image) {
			image = await Jimp.create(width, height)
		}

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const dataIndex = (y * width * 4) + (x * 4)
				if (!(data[dataIndex] === 0 && data[dataIndex + 1] === 0 && data[dataIndex + 2] === 0 && data[dataIndex + 3] === 0)) {
					image.setPixelColour(Jimp.rgbaToInt(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3]), x, y)
				}
			}
		}

		return new Uint8ClampedArray(await image.getBufferAsync(Jimp.MIME_PNG))
	}

	const frames = new Cycled(gifFrames)
	let isPlaying_ = true
	let animateFrame = async () => {
		callback(await renderGifFrame({ data: frames.current().data, width, height }))
		await delay(frames.current().timeCode - frames.previous().timeCode)
		frames.step(2)

		if (isPlaying_) {
			await animateFrame()
		}
	}

	if (maximumFrameRate !== Infinity) {
		animateFrame = debounceFunction(animateFrame, { wait: 1000 / maximumFrameRate })
	}

	animateFrame()

	return {
		get isPlaying() {
			return isPlaying_
		},
		set isPlaying(value) {
			if (isPlaying_ === false && value === true) {
				animateFrame()
			}

			isPlaying_ = value
		}
	}
}
