Mosaic App
----------

Prototype for build mosaic from images.

1. Select a local image file
2. The image is divided into tiles 16x16
  1. The size is configurable
3. For each tile, the average color is computed and the final result is rendered


How to run ?
------------

```
npm run dev
```
or
```
npm run build
```

Features
--------

* [x] [NodeJS](https://nodejs.org/) and [Express](http://expressjs.com/)
* [x] [multer](https://www.npmjs.com/package/multer/) for image upload
* [x] [Bootstrap](http://getbootstrap.com/) framework for minimal UI
* [x] ES6 syntax with [Babel](https://babeljs.io/)
* [x] Client side processing

Troubleshooting
---------------

* [x] At first glance, I tried to process the tiles from server side with `gm` npm package. But depending on the
size of the image, I got an weird error and I was not able to solve it.
* [x] Other problem is server processing of all tiles by url. E.g; `localhost:8765/color/hexcode`. Again, for big
images, this can take a long time, so I decided to render all tiles in client side for better performance.
