# pixel-grid

> render a grid of small squares

Small module for rendering a grid of squares. Use it for data visualization, for art, or just for fun! Uses webgl and built with `regl`, so should be highly performant.

## install

Add to your project with

```
npm install pixel-grid
```

## example

Run this

```js
var grid = require('pixel-grid')

var data = [0, 1, 0, 1, 0, 0, 0, 1, 0]

var pixels = grid(data, {
  root: document.body,
  background: 'gray',
  rows: 3,
  columns: 3
})
```

## usage

#### `var pixels = require('pixel-grid')(data, opts)`

The `data` are the values to render in each square, and can be passed as a flat or nested aray

- flat array `[a, b, c, d]`
- nested array `[[a, b], [c, d]]`

Each value `a, b, ...` can be specified in several ways

- a single number `0.5` will be interpreted as `[0.5, 0.5, 0.5]`
- an rgb color `[0, 1, 1]`
- a color string `rgb(0, 255, 255)` or `#ffa500`

All the options in `opts` are optional, and include

- `root` a root element to which to append the created canvas
- `rows` `columns` number of rows and columns in the grid
- `width` `height` size of canvas in pixels, default = full screen
- `size` size of each square in pixels, default = 10
- `padding` spacing between each square in pixels, default = 2
- `background` color of the background, default = white

Grid dimensions are determined as follows

- If a nested array is passed, its shape is used to get the number of rows and columns
- If a flat array is passed, its shape is based on `opts.rows` and `opts.columns`
- If those are unspecified, we use the largest square grid that contains all values

## properties and methods

#### `pixels.canvas`

The created canvas element for appending to the DOM yourself as in

```js
var grid = require('pixel-grid')
var pixels = grid([[0, 1], [1, 0]])
document.body.appendChild(pixels.canvas)
```

#### `pixels.update(data)`

Update the pixel grid with new data.