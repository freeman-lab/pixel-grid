var flatten = require('flatten')
var isarray = require('is-array')
var isnumber = require('is-number')
var isstring = require('is-string')
var parse = require('parse-color')

function convert (data) {
  data = (isarray(data[0]) && data[0].length !== 3) ? flatten(data, 1) : data

  if (isnumber(data[0])) {
    data = data.map(function (d) { return [d, d, d] })
  }

  if (isstring(data[0])) {
    data = data.map(function (d) {
      return parse(d).rgb.map(function (c) {
        return c / 255
      })
    })
  }

  return data
}

module.exports = convert
