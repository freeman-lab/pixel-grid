var util = require('util')
var flatten = require('flatten')
var isarray = require('is-array')

function Table(data, opts) {
  if (!(this instanceof Table)) return new Table(data, opts)
  var self = this
  opts = opts || {}

  opts.size = opts.size || 0.1
  opts.width = opts.width || 600
  opts.height = opts.height || 400

  var canvas = document.createElement('canvas')
  canvas.width = opts.width
  canvas.height = opts.height
  var aspect = opts.width / opts.height
  if (opts.root) opts.root.appendChild(canvas)

  var rows, columns, aspect

  if (isarray(data[0])) {
    rows = data.length
    columns = data[0].length
    data = flatten(data)
  } else {
    if ((!opts.rows) | (!opts.columns)) {
      throw Error('must specify rows and columns')
    }
    rows = opts.rows
    columns = opts.columns
    if (rows * columns != data.length) {
      var msg = util.format(
        'number of rows and columns %sx%s does not match number of values %s',
        rows, columns, data.length
      )
      throw Error(msg)
    }
  }

  var grid = []

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      var x = -1 + (i - 1) * opts.size / aspect + 2 * opts.size / aspect
      var y = 1 - (j - 1) * opts.size - 2 * opts.size
      grid.push([x, y])
    }
  }

  var regl = require('regl')(canvas)

  var draw = regl({
    vert: `
    precision mediump float;
    attribute vec2 position;
    attribute float color;
    varying float vcolor;
    void main() {
      gl_PointSize = 12.0;
      gl_Position = vec4(position.x, position.y, 0.0, 1.0);
      vcolor = color;
    }
    `,

    frag: `
    precision mediump float;
    varying float vcolor;
    void main() {
      gl_FragColor = vec4(0.6 - vcolor, 0.6 - vcolor, 0.6 - vcolor, 1.0);
    }
    `,

    attributes: {
      position: regl.prop('position'),
      color: regl.prop('color')
    },

    primitive: 'points',

    count: rows * columns
  })

  var buffer = {
    position: regl.buffer(grid),
    color: regl.buffer(data)
  }

  draw({
    position: buffer.position, 
    color: buffer.color
  })

  self._buffer = buffer
  self._draw = draw
  self.canvas = canvas
}

Table.prototype.update = function (data) {
  var self = this
  data = isarray(data[0]) ? flatten(data) : data
  self._draw({
    position: self._buffer.position,
    color: self._buffer.color(data)
  })
}

module.exports = Table