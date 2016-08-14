var square = require('./index')

var data = [0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0]

var table = square(data, {rows: 4, columns: 5})

document.body.appendChild(table.canvas)

// setInterval(function () {
//   var data = Array(4 * 5).fill().map(function () {return Math.round(Math.random())})
//   table.update(data)
// }, 100)

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