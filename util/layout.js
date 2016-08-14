function layout(rows, columns, padding, size, aspect) {
  var grid = []

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      var x = -1 + (i) * (padding + size) + (padding) + (size / 2)
      var y = 1 - (j) * (padding + size) - (padding) - (size / 2)
      grid.push([x, y])
    }
  }

  return grid
}

module.exports = layout