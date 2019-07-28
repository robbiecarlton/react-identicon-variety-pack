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
  newOpts.size = newOpts.size || newOpts.gridSize * newOpts.scale 

	return newOpts;
}

export default function renderIcon(opts, canvas) {
  opts = buildOpts(opts || {});
  const { size } = opts

	canvas.width = canvas.height = size

  const cc = canvas.getContext('2d')
  const gray = 100 * rand()
	cc.fillStyle = encodeColor({h: 0, s: 0, l: gray})
	cc.fillRect(0, 0, canvas.width, canvas.height)
  const numDiscs = 3 + (rand() * 10)
  const centers = []
  for (let i = 0; i < numDiscs; i++) {
    centers.push({
      x: rand() * size,
      y: rand() * size
    })
  }

  cc.lineWidth = 0.5
  if (gray < 50) {
    cc.strokeStyle = "#FFFFFF"
  } else {
    cc.strokeStyle = "#000000"    
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      const start = centers[Math.floor(centers.length * rand())]
      const end = centers[Math.floor(centers.length * rand())]
      cc.beginPath()
      cc.moveTo(start.x, start.y)
      cc.lineTo(end.x, end.y)      
      cc.stroke()
    }
  }

  for (let i = 0; i < numDiscs; i++) {
    const { x, y } = centers[i]
    cc.fillStyle = encodeColor(createColor())
    cc.beginPath();
    let radius = 3 + (rand() * size * 0.1)
    cc.arc(x, y, radius, 0, 2*Math.PI)
    cc.fill()
  }

	return canvas;
}