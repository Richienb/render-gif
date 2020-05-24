const test = require("ava")
const fs = require("fs").promises
const delay = require("delay")
const renderGif = require(".")

test("main", async t => {
	let result = ""

	const animation = renderGif(await fs.readFile("fixture.gif"), data => {
		result += data
	}, { maximumFramerate: 30 })

	await delay(500)
	animation.playing = false

	t.snapshot(result)
})
