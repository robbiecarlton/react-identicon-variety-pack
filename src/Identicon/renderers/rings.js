import { rand, seedrand, encodeColor, createColor } from './utils'

function buildOpts(opts) {
	const newOpts = {};

	newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

	seedrand(newOpts.seed);

  if (opts.size && opts.gridSize && opts.scale) {
    throw new Error ("Don't specify size, gridSize *and* scale. Choose two.")    
  }

	newOpts.gridSize = opts.gridSize || opts.size / opts.scale || 8;
	newOpts.scale = opts.scale || opts.size / opts.gridSize || 4;
	newOpts.size = opts.size || newOpts.gridSize * newOpts.scale 
	
	return newOpts;
}

export default function renderIcon(opts, canvas) {
	const { size } = buildOpts(opts || {});

	canvas.width = canvas.height = size

	const cc = canvas.getContext('2d');
	cc.fillStyle = encodeColor({h: 0, s: 0, l: 100*rand()})
	cc.fillRect(0, 0, canvas.width, canvas.height);
  let radius = size/2
  while (radius > 1) {
    cc.fillStyle = encodeColor(createColor())
    cc.beginPath()
    cc.arc(size/2, size/2, radius, 0, 2*Math.PI)
    cc.fill()
    radius = radius - (size/8 * rand())
  }

	return canvas;
}