var grid = require('./index')
var parse = require('parse-color')
var position = require('mouse-position')

document.body.style.background = 'black'

var rows = Math.floor(window.innerHeight / 16) - 2
var columns = Math.floor(window.innerWidth / 16) - 1

var data = []

for (var i = 0; i < rows; i++) {
  for (var j = 0; j < columns; j++) {
    data.push([0, 0, 0])
  }
}

var pixels = grid(data, {
  root: document.body, 
  rows: rows, 
  columns: columns, 
  size: 15, 
  padding: 1,
  background: [0, 0, 0]
})

var mouse = position(pixels.canvas)

var row, column, rand, color
var hue = 0

mouse.on('move', function () {  
  row = Math.floor(mouse[1] / 16)
  column = Math.floor(mouse[0] / 16)
  if (row < rows && column < columns) {
    hue = (hue + 1) % 360
    color = parse('hsl(' + hue + ',50, 50)').rgb
    color = color.map(function (d) {return d / 50})
    data[row * columns + column] = color
    data[(row - 1) * columns + column] = color
    data[Math.min((row + 1) * columns + column, data.length)] = color
    data[row * columns + (column - 1)] = color
    data[Math.min(row * columns + (column + 1), data.length)] = color
    data[(row + 1) * columns - column] = color
    data[(row + 1) * columns - (column + 1)] = color
    data[row * columns - (column)] = color
    data[(row + 1) * columns - (column - 1)] = color
    data[Math.min((row + 2) * columns - (column), data.length)] = color
  }
})

pixels.frame(function () {
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
