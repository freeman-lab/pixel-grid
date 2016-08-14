var util = require('util')
var isnumber = require('is-number')
var isarray = require('is-array')
var isstring = require('is-string')
var parse = require('./util/parse')
var layout = require('./util/layout')

function Grid(data, opts) {
  if (!(this instanceof Grid)) return new Grid(data, opts)
  var self = this
  opts = opts || {}

  opts.background = opts.background || [0.5, 0.5, 0.5]
  opts.size = isnumber(opts.size) ? opts.size : 10
  opts.padding = isnumber(opts.padding) ? opts.padding : opts.size / 2

  if (isstring(opts.background)) opts.background = require('parse-color')(opts.background).rgb

  if (isarray(data[0]) && data[0].length != 3) {
    opts.rows = data.length
    opts.columns = data[0].length
  }

  if (!opts.rows || !opts.columns) {
    opts.rows = opts.columns = Math.round(Math.sqrt(data.length))
  }

  if (!opts.width || !opts.height) {
    opts.width = opts.columns * opts.size + (opts.columns + 1) * opts.padding
    opts.height = opts.rows * opts.size + (opts.rows + 1) * opts.padding
  }

  var canvas = document.createElement('canvas')
  canvas.width = opts.width
  canvas.height = opts.height
  var aspect = opts.width / opts.height
  if (opts.root) opts.root.appendChild(canvas)

  var colors = parse(data)
  var positions = layout(opts.rows, opts.columns, 
    2 * opts.padding / opts.width, 
    2 * opts.size / opts.width, 
    aspect)  

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

  var draw = function(positions, colors) {
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
  self.canvas = canvas
}

Grid.prototype.update = function (data) {
  var self = this
  var colors = parse(data)
  self._draw(self._buffer.position, self._buffer.color(colors))
}

module.exports = Grid