class ColorHelper {
  constructor () {
    this.colorThief = new ColorThief();
  }

  getColor (canvas) {
    return this.colorThief.getColor(canvas, 10)
  }

  componentToHex (c) {
    const hex = c ? c.toString(16) : 'FF';
    return hex.length === 1 ? `0${hex}` : hex;
  }

  rgbToHex (r, g, b) {
    const rComponent = this.componentToHex(r);
    const gComponent = this.componentToHex(g);
    const bComponent = this.componentToHex(b);
    return `#${rComponent}${gComponent}${bComponent}`;
  }
}
