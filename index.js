var parse = require('parse-color')
var isnumber = require('is-number')
var isstring = require('is-string')
var isarray = require('is-array')
var convert = require('./util/convert')
var layout = require('./util/layout')

function Pixels (data, opts) {
  if (!(this instanceof Pixels)) return new Pixels(data, opts)
  var self = this
  opts = opts || {}

  opts.background = opts.background || [0.5, 0.5, 0.5]
  opts.size = isnumber(opts.size) ? opts.size : 10
  opts.padding = isnumber(opts.padding) ? opts.padding : 2

  if (isstring(opts.background)) opts.background = parse(opts.background).rgb.map(function (c) { return c / 255 })

  if (isarray(data[0]) && data[0].length !== 3) {
    opts.rows = data.length
    opts.columns = data[0].length
  }

  if (!opts.rows || !opts.columns) {
    opts.rows = opts.columns = Math.round(Math.sqrt(data.length))
  }

  var width = opts.columns * opts.size + (opts.columns + 1) * opts.padding
  var height = opts.rows * opts.size + (opts.rows + 1) * opts.padding

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  if (opts.root) opts.root.appendChild(canvas)

  var colors = opts.formatted ? data : convert(data)

  var positions = layout(
    opts.rows, opts.columns,
    2 * opts.padding / width,
    2 * opts.size / width,
    width / height
  )

  var regl = require('regl')(canvas)

  var squares = regl({
    vert: `
    precision mediump float;
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 vcolor;
    void main() {
      gl_PointSize = float(${opts.size});
      gl_Position = vec4(position.x, position.y, 0.0, 1.0);
      vcolor = color;
    }
    `,

    frag: `
    precision mediump float;
    varying vec3 vcolor;
    void main() {
      gl_FragColor = vec4(vcolor, 1.0);
    }
    `,

    attributes: {
      position: regl.prop('position'),
      color: regl.prop('color')
    },

    primitive: 'points',

    count: colors.length
  })

  var buffer = {
    position: regl.buffer(positions),
    color: regl.buffer(colors)
  }

  var draw = function (positions, colors) {
    regl.clear({
      color: opts.background.concat([1])
    })
    squares({
      position: positions,
      color: colors
    })
  }

  draw(buffer.position, buffer.color)

  self._buffer = buffer
  self._draw = draw
  self._formatted = opts.formatted
  self.canvas = canvas
  self.frame = regl.frame
}

Pixels.prototype.update = function (data) {
  var self = this
  var colors = self._formatted ? data : convert(data)
  self._draw(self._buffer.position, self._buffer.color(colors))
}

module.exports = Pixels
