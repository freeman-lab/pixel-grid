var test = require('tape')
var convert = require('./util/convert')
var layout = require('./util/layout')

test('convert flat', function (t) {
  t.deepEqual(convert([0, 1, 1, 0]),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('convert nested', function (t) {
  t.deepEqual(convert([[0, 1], [1, 0]]),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('convert flat strings', function (t) {
  t.deepEqual(convert(['black', 'white', 'white', 'black']),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('convert nested strings', function (t) {
  t.deepEqual(convert([['black', 'white'], ['white', 'black']]),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('convert flat rgb', function (t) {
  t.deepEqual(convert([[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]]),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('convert nested rgb', function (t) {
  t.deepEqual(convert([[[0, 0, 0], [1, 1, 1]], [[1, 1, 1], [0, 0, 0]]]),
    [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]])
  t.end()
})

test('layout simple', function (t) {
  t.deepEqual(layout(2, 2, 0.5, 0.5, 1),
    [[-0.75, 0.75], [0.25, 0.75], [-0.75, -0.25], [0.25, -0.25]])
  t.end()
})
