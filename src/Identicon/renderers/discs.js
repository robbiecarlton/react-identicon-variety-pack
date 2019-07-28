import { rand, seedrand, encodeColor, createColor } from './utils'

function buildOpts(opts) {
	const newOpts = {};

	newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

	seedrand(newOpts.seed);

	newOpts.size = opts.size || 8;
	newOpts.scale = opts.scale || 4;

	return newOpts;
}

export default function renderIcon(opts, canvas) {
	opts = buildOpts(opts || {});

  const canvasSize = opts.size * opts.scale

	canvas.width = canvas.height = canvasSize

	const cc = canvas.getContext('2d');
	cc.fillStyle = encodeColor({h: 0, s: 0, l: 100*rand()})
	cc.fillRect(0, 0, canvas.width, canvas.height);
  cc.fillStyle = opts.color;
  const numDiscs = 3 + (rand() * 10)
  for (let i = 0; i < numDiscs; i++) {
    cc.fillStyle = encodeColor(createColor())
    cc.beginPath();
    let radius
    if (i < 2) {
      radius = rand() * canvasSize
    } else {
      radius = rand() * canvasSize * 0.125
    }
    cc.arc(rand()*canvasSize, rand()*canvasSize, radius, 0, 2*Math.PI)
    cc.fill()
  }

	return canvas;
}