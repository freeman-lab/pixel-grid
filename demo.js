var util = require('util')
var css = require('dom-css')
var grid = require('./index')
var parse = require('parse-color')
var position = require('mouse-position')

document.body.style.transition = '0.3s all'

var rows = Math.floor(window.innerHeight * 0.97 / 16) - 2
var columns = Math.floor(window.innerWidth * 0.97 / 16) - 1

var link = document.createElement('a')
css(link, {
  width: 160,
  height: 160,
  position: 'fixed',
  right: window.innerWidth * 0.03,
  bottom: window.innerHeight * 0.03,
  cursor: 'pointer'
})
link.href = 'https://github.com/freeman-lab/pixel-grid'
document.body.appendChild(link)

var data = []

for (var i = 0; i < rows; i++) {
  for (var j = 0; j < columns; j++) {
    data.push([0, 0, 0])
  }
}

var letters = [
  [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10],
  [10, 11], [10, 12], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
  [15, 13], [16, 13], [10, 14], [10, 15], [10, 16], [11, 16], [12, 16],
  [13, 16], [14, 16], [15, 16], [16, 16],
  [10, 19], [10, 20], [10, 21], [10, 22], [10, 23], [10, 24],
  [11, 24], [12, 24], [13, 24], [14, 24], [15, 24], [16, 24],
  [11, 19], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19],
  [16, 20], [16, 21], [16, 22], [16, 23],
  [10, 27], [11, 27], [12, 28], [13, 28], [14, 29], [15, 29], [16, 30],
  [15, 31], [14, 31], [13, 32], [12, 32], [11, 33], [10, 33],
  [10, 36], [11, 36], [12, 36], [13, 36], [14, 36], [15, 36], [16, 36],
  [10, 37], [10, 38], [10, 39], [10, 40],
  [13, 37], [13, 38], [13, 39], [13, 40],
  [16, 37], [16, 38], [16, 39], [16, 40]
]

letters = letters.map(function (letter) {
  return [letter[0] - 15 + Math.floor(rows / 2), letter[1] - 25 + Math.floor(columns / 2)]
})

function drawOverlay (array) {
  array.forEach(function (el) {
    data[(el[0]) * columns + el[1]] = [1, 1, 1]
  })
}

var arrow = [
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5],
  [4, 4], [3, 3], [6, 4], [7, 3]
]

arrow = arrow.map(function (el) {
  return [el[0] + Math.floor(rows - 10), el[1] + Math.floor(columns - 8)]
})

var pixels = grid(data, {
  root: document.body,
  rows: rows,
  columns: columns,
  size: 15,
  padding: 1,
  background: [0, 0, 0],
  formatted: true
})

pixels.canvas.style.marginLeft = (window.innerWidth * 0.03) / 2 + 'px'
pixels.canvas.style.marginTop = (window.innerHeight * 0.04) / 2 + 'px'

var mouse = position(pixels.canvas)

var row, column, rand, color
var hue = 0

var started = false

mouse.on('move', function () {
  if (!started) started = true
  row = Math.floor(mouse[1] / 16)
  column = Math.floor(mouse[0] / 16)
  if (row < rows && column < columns) {
    hue = (hue + 1) % 360
    color = parse('hsl(' + hue + ',50, 50)').rgb
    document.body.style.background = util.format('rgb(%s,%s,%s)', color[0], color[1], color[2])
    color = color.map(function (d) { return d / 50 })

    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        data[Math.min((row + i) * columns + (column + j), data.length)] = color
        data[Math.min((row + i + 1) * columns - (column + j), data.length)] = color
      }
    }
  }
})

pixels.frame(function () {
  if (!started) {
    drawOverlay(letters)
  }
  drawOverlay(arrow)
  for (var i = 0; i < data.length; i++) {
    rand = Math.random() * 0.02
    data[i] = [
      data[i][0] * 0.95 + rand,
      data[i][1] * 0.95 + rand,
      data[i][2] * 0.95 + rand
    ]
  }
  pixels.update(data)
})
