var grid = require('./index')

var data = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 0, 0]
]

grid(data, {
  root: document.body,
  size: 25
})
