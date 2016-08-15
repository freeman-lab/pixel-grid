function layout (rows, columns, padding, size, aspect) {
  var grid = []

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var x = -1 + aspect * ((i) * (padding + size) + (padding) + (size / 2))
      var y = 1 - ((j) * (padding + size) + (padding) + (size / 2))
      grid.push([y, x])
    }
  }

  return grid.reverse()
}

module.exports = layout
