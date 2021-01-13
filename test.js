const test = require("ava")
const { promises: fs } = require("fs")
const delay = require("yoctodelay")
const renderGif = require(".")

test("main", async t => {
	let result = ""

	const animation = renderGif(await fs.readFile("fixture.gif"), data => {
		result += data
	}, { maximumFrameRate: 30 })

	await delay(500)
	animation.isPlaying = false

	t.is(typeof result, "string")
})
