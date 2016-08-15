var util = require('util')
var grid = require('./index')
var parse = require('parse-color')
var position = require('mouse-position')

var rows = Math.floor(window.innerHeight * 0.97 / 16) - 2
var columns = Math.floor(window.innerWidth * 0.97 / 16) - 1

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
  background: [0, 0, 0],
  formatted: true
})

pixels.canvas.style.marginLeft = (window.innerWidth * 0.03) / 2 + 'px'
pixels.canvas.style.marginTop = (window.innerHeight * 0.04) / 2 + 'px'

var mouse = position(pixels.canvas)

var row, column, rand, color
var hue = 0

mouse.on('move', function () {  
  row = Math.floor(mouse[1] / 16)
  column = Math.floor(mouse[0] / 16)
  if (row < rows && column < columns) {
    hue = (hue + 1) % 360
    color = parse('hsl(' + hue + ',50, 50)').rgb
    document.body.style.background = util.format('rgb(%s,%s,%s)', color[0], color[1], color[2])
    color = color.map(function (d) {return d / 50})

    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        data[Math.min((row + i) * columns + (column + j), data.length)] = color
        data[Math.min((row + i + 1) * columns - (column + j), data.length)] = color
      }
    }
    
    // data[row * columns + column] = color
    // data[(row - 1) * columns + column] = color
    // data[(row - 1) * columns + (column - 1)] = color
    // data[Math.min((row + 1) * columns + column, data.length)] = color
    // data[row * columns + (column - 1)] = color
    // data[(row - 1) * columns + (column - 1)] = color
    // data[(row + 1) * columns + (column + 1)] = color
    // data[Math.min(row * columns + (column + 1), data.length)] = color

    // data[(row + 1) * columns - column] = color
    // data[(row + 1) * columns - (column + 1)] = color
    // data[row * columns - (column)] = color
    // data[(row + 1) * columns - (column - 1)] = color
    // data[Math.min((row + 2) * columns - (column), data.length)] = color

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
