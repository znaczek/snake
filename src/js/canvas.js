let ctx = null;

const canvasEl = {};
const pixelHeight = 6;
const pixelWidth = 6;

class Canvas {

    setElement(canvas) {
        if (ctx !== null) {
            throw new Error('Canvas element is already set');
        }
        canvasEl.width = canvas.clientWidth;
        canvasEl.height = canvas.clientHeight;
        ctx = canvas.getContext('2d');
    }

    getCtx() {
        return ctx;
    }

    clear() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }

    drawPixel(x, y) {
        ctx.fillRect(x * pixelWidth + 1, y * pixelHeight + 1, pixelWidth -1 , pixelHeight -1);
    }
}

const canvas = new Canvas();

export default canvas;
