var grid = require('./index')

// data needs to be a flat list, specify rows and columns explicitly

// data is either a nested or flat array of floats or hex strings or rgb strings

// problem: if i have a nested array, is it because it's 2d or because the entries are rgb values

var rows = 10
var columns = 10

var data = Array(rows * columns).fill().map(function () {
  return [Math.random(), 1, Math.random()]
})

// var data = [
//   [[0, 1, 0], [0, 1, 1]],
//   [[1, 1, 0], [1, 0, 1]]
// ]

var pixels = grid(data, {rows: rows, columns: columns, background: [0, 0, 0], size: 10, padding: 1})

document.body.appendChild(pixels.canvas)

setInterval(function () {
  var data = Array(rows * columns).fill().map(function () {
    return [Math.random(), 1, Math.random()]
  })
  pixels.update(data)
}, 50)

// var square = require('square-table')

// // option 1

// var table = square([0, 1, 0, 1], {
//   root: document.body,
//   rows: 4,
//   columns: 5,
//   color: 'green'
// })

// table.update([[0, 2], [0, 3]])


// // option 2

// var table = square([[0, 1], [0, 2]], {
//   root: document.body, 
//   color: 'green'
// })

// tabe.update([[0, 1], [0, 2]])

// SIZE

// option 1

// specify width and height

// option 2

// this could just be the default
// specify square size and padding, compute exact size in pixels from that


















