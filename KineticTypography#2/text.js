export class Text {
  constructor() {
    this.canvas = document.createElement('canvas');
    // this.canvas.style.position = 'absolute';
    // this.canvas.style.left = '0';
    // this.canvas.style.top = '0';
    // document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
  }

  setText(str, density, stageWidth, stageHeight) {
    console.log(stageWidth, stageHeight)
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const textContent = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = "Hind";

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.textBaseline = 'middle'; 
    const fontPos = this.ctx.measureText(textContent);
    this.ctx.fillText(
      textContent,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + ((stageHeight - fontSize) / 2)
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles = [];
    let i = 0, width = 0, pixel = null;

    for (let h = 0; h < stageHeight; h += density) {
      ++i;
      const slide = (i % 2) === 0;
      width = 0;
      if (slide === 1) {
        width += 6;
      }

      for (let w = 0; w < stageWidth; w += density) {
        pixel = imageData[((w + (h * stageWidth)) * 4) - 1];
        if (pixel !== 0 && w > 0 && w < stageWidth && h > 0 && h < stageHeight) {
          particles.push({x: w, y: h});
        }
      }
    }

    return particles;
  }
}