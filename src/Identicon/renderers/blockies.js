import { rand, seedrand, encodeColor, createColor } from './utils'

function createImageData(size) {
	const width = size // Only support square icons for now
	const height = size

	const dataWidth = Math.ceil(width / 2)
	const mirrorWidth = width - dataWidth

	const data = []
	for(let y = 0; y < height; y++) {
		let row = []
		for(let x = 0; x < dataWidth; x++) {
			// this makes foreground and background color to have a 43% (1/2.3) probability
			// spot color has 13% chance
			row[x] = Math.floor(rand()*2.3)
		}
		const r = row.slice(0, mirrorWidth)
		r.reverse()
		row = row.concat(r)

		for(let i = 0; i < row.length; i++) {
			data.push(row[i])
		}
	}

	return data
}

function buildOpts(opts) {
	const newOpts = {};

	newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

	seedrand(newOpts.seed);

	newOpts.size = opts.size || 8;
	newOpts.scale = opts.scale || 4;
	newOpts.color = opts.color || encodeColor(createColor())
	newOpts.bgcolor = opts.bgcolor || encodeColor(createColor())
	newOpts.spotcolor = opts.spotcolor || encodeColor(createColor())

	return newOpts;
}

export default function renderIcon(opts, canvas) {
	opts = buildOpts(opts || {});
	const imageData = createImageData(opts.size);
	const width = Math.sqrt(imageData.length);

	canvas.width = canvas.height = opts.size * opts.scale;

	const cc = canvas.getContext('2d');
	cc.fillStyle = opts.bgcolor;
	cc.fillRect(0, 0, canvas.width, canvas.height);
	cc.fillStyle = opts.color;

	for(let i = 0; i < imageData.length; i++) {

		// if data is 0, leave the background
		if(imageData[i]) {
			const row = Math.floor(i / width);
			const col = i % width;

			// if data is 2, choose spot color, if 1 choose foreground
			cc.fillStyle = (imageData[i] === 1) ? opts.color : opts.spotcolor;

			cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
		}
	}

	return canvas;
}