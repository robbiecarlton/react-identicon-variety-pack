import { flatten, isUndefined } from 'lodash'
import { rand, getBitStream, seedrand, encodeColor, mixColors, createColor } from './utils'

function createBishopData(size, seed) {
	const grid = new Array(size).fill(0).map(() => new Array(size).fill(0))
	let x = Math.floor(rand() * size)
	let y = Math.floor(rand() * size)
	grid[x][y] = grid[x][y] + 1

	const scrambledSeed = seed.split('').sort(() => rand() - 0.5).join('')
	const bitStream = getBitStream(scrambledSeed)
	let vertical
	let horizontal	
	do  {
		vertical = bitStream.next().value
		horizontal = bitStream.next().value		
		if (horizontal === 0) {
			if (x > 0) {
				x--
			}
		} else {
			if (x < size -1) {
				x++
			}
		}

		if (vertical === 0) {
			if (y > 0) {
				y--
			}
		} else {
			if (y < size -1) {
				y++
			}
		}

		grid[x][y] = grid[x][y] + 1
	} while (!isUndefined(vertical) && !isUndefined(horizontal))


	return flatten(grid.map(col => col.reverse()))
}

function buildOpts(opts) {
	const newOpts = {};

	newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

	seedrand(newOpts.seed);

	newOpts.size = opts.size || 8;
	newOpts.scale = opts.scale || 4;
	newOpts.color = opts.color || createColor();
	newOpts.bgcolor = opts.bgcolor || createColor();

	return newOpts;
}

export default function renderIcon(opts, outputCanvas) {
	opts = buildOpts(opts || {})
	const imageData = createBishopData(opts.size, opts.seed)
	const width = Math.sqrt(imageData.length);

	const maxHeight = imageData.reduce((a, b) => Math.max(a, b))

	var canvas = document.createElement('canvas')

	const canvasSize = opts.size * opts.scale

	canvas.width = canvas.height = canvasSize

	const cc = canvas.getContext('2d');
	cc.fillStyle = encodeColor(opts.bgcolor);
	cc.fillRect(0, 0, canvas.width, canvas.height);

	for(let i = 0; i < imageData.length; i++) {
		// if data is 0, leave the background
		if(imageData[i]) {
			const row = Math.floor(i / width);
			const col = i % width;

			// if data is 2, choose spot color, if 1 choose foreground
			cc.fillStyle = encodeColor(mixColors(opts.bgcolor, opts.color, imageData[i]/maxHeight))

			cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
			// cc.arc(col * opts.scale, row * opts.scale, opts.scale, 0, Math.PI * 2);			
		}
	}

	outputCanvas.width = outputCanvas.height = canvasSize
	const halfCSize = canvasSize/2
	const occ = outputCanvas.getContext('2d')
	occ.drawImage(canvas, 0, 0, halfCSize, halfCSize)
	occ.scale(-1, 1)
	occ.drawImage(canvas, -canvasSize, 0, halfCSize, halfCSize)
	occ.scale(1, -1)
	occ.drawImage(outputCanvas, -canvasSize, -canvasSize)

	return outputCanvas
}