class HtmlHelper {
  createCanvas (x, y, className) {
    const canvas = document.createElement('canvas');
    canvas.className = className;
    canvas.width = TILE_WIDTH;
    canvas.height = TILE_HEIGHT;
    canvas.setAttributeNode(this.createAttribute('data-x', x));
    canvas.setAttributeNode(this.createAttribute('data-y', y));
    return canvas;
  }

  createAttribute (key, value) {
    const attr = document.createAttribute(key);
    attr.value = value;
    return attr;
  }
}
