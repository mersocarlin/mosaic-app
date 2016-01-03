
const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

class Client {
  constructor () {
    this.img = document.getElementById('img');
    this.tilesDiv = document.getElementById('tiles');
    this.uploadForm = document.getElementById('uploadForm');
    this.fileMosaic = document.getElementById('fileMosaic');

    this.htmlHelper = new HtmlHelper();
    this.colorHelper = new ColorHelper();

    this.setup();
  }

  setup () {
    this.setupInputFile();
    this.setupUploadFormSubmit();
  }

  setupInputFile () {
    $(document).on('change', '.btn-file :file', () => {
      const $input = $(this.fileMosaic);
      const numFiles = 1;
      const label = $input.val().replace(/\\/g, '/').replace(/.*\//, '');

      $input.trigger('fileselect', [numFiles, label]);
    });

    // $('.btn-file :file').on('fileselect', (event, numFiles, label) => {
    //   console.log(numFiles);
    //   console.log(label);
    // });
  }

  setupUploadFormSubmit () {
    $('#uploadForm').submit((e) => {
      e.preventDefault();

      const { tilesDiv, img, uploadForm } = this;

      const formData = new FormData(uploadForm);

      tilesDiv.innerHTML = '';

      $.ajax({
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: (data) => {
          img.onload = () => {
            setTimeout(() => {
              this.processImage();
            }, 500);
          };
          img.src = data.path;
        },
      });
    });
  }

  createTilePromise (x, y, breakLineForNextRow) {
    return new Promise((resolve) => {
      const { colorHelper, img } = this;
      const className = 'tile' + (breakLineForNextRow ? ' end' : '');
      const canvas = this.htmlHelper.createCanvas(x, y, className);
      const { width, height } = canvas;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, -x, -y);
      ctx.moveTo(x, y);

      const rgb = colorHelper.getColor(canvas);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colorHelper.rgbToHex(rgb[0], rgb[1], rgb[2]);
      ctx.fillRect(0, 0, TILE_WIDTH, TILE_HEIGHT);

      resolve(canvas);
    });
  }

  getImgRealSize () {
    return new Promise((resolve) => {
      $('<img />')
        .hide()
        .attr('src', this.img.src)
        .load(function () {
          resolve({
            width: this.width,
            height: this.height,
          });
        });
    });
  }

  processImage () {
    this
      .getImgRealSize()
      .then((size) => {
        const { width, height } = size;

        const promises = [];
        let breakLineForNextRow = true;

        for (let j = 0; j < height; j += TILE_HEIGHT) {
          breakLineForNextRow = true;
          for (let i = 0; i < width; i += TILE_WIDTH) {
            promises.push(this.createTilePromise(i, j, breakLineForNextRow));

            if (breakLineForNextRow) {
              breakLineForNextRow = false;
            }
          }
        }

        Promise
          .all(promises)
          .then((result) => {
            this.animateTileAtPos(result);
          });
      });
  }

  animateTileAtPos (tiles, pos = 0) {
    if (pos >= tiles.length) {
      return;
    }

    setTimeout(() => {
      this.tilesDiv.appendChild(tiles[pos]);
      this.animateTileAtPos(tiles, pos + 1);
    }, 10);
  }
}
