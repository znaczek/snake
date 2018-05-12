import * as dirs from './snake';

let ctx = null;

const PIXEL_SIZE = 6;
const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 50;
const CANVAS_WIDTH_PX = PIXEL_SIZE * CANVAS_WIDTH;
const CANVAS_HEIGHT_PX = PIXEL_SIZE * CANVAS_HEIGHT;

class Canvas {

    setElement(canvas) {
        if (ctx !== null) {
            throw new Error('Canvas element is already set');
        }
        canvas.width = CANVAS_WIDTH_PX;
        canvas.height = CANVAS_HEIGHT_PX;
        canvas.style.display = 'block';
        ctx = canvas.getContext('2d');
        ctx.scale(1, 1);
    }

    getCtx() {
        return ctx;
    }

    clear() {
        ctx.clearRect(0, 0, CANVAS_WIDTH_PX, CANVAS_HEIGHT_PX);
    }

    drawPixel(x, y) {
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE -1 , PIXEL_SIZE -1);
    }

    drawGameBorder() {
        for (let i = 0; i < CANVAS_HEIGHT; i+=1) {
            this.drawPixel(0, i);
            this.drawPixel(99, i);
        }
        for (let i = 0; i < CANVAS_WIDTH; i+=1) {
            this.drawPixel(i, 0);
            this.drawPixel(i, 49);
        }
    }

    prepareBoard() {
        this.clear();
        this.drawGameBorder();
    }

    drawHead(x, y, direction) {
        switch (direction) {
            case dirs.DIR_RIGHT:
                this.drawPixel(x + 2, y);
                this.drawPixel(x + 1, y + 1);
                this.drawPixel(x + 3, y + 1);
                this.drawPixel(x + 4, y + 1);
                this.drawPixel(x, y + 2);
                this.drawPixel(x + 1, y + 2);
                this.drawPixel(x + 2, y + 2);
                this.drawPixel(x + 3, y + 2);
                this.drawPixel(x + 4, y + 2);
                break;
            case dirs.DIR_LEFT:
                this.drawPixel(x + 2, y);
                this.drawPixel(x , y + 1);
                this.drawPixel(x + 1, y + 1);
                this.drawPixel(x + 3, y + 1);
                this.drawPixel(x, y + 2);
                this.drawPixel(x + 1, y + 2);
                this.drawPixel(x + 2, y + 2);
                this.drawPixel(x + 3, y + 2);
                this.drawPixel(x + 4, y + 2);
                break;
            case dirs.DIR_UP:
                this.drawPixel(x, y);
                this.drawPixel(x + 1, y);
                this.drawPixel(x, y + 1);
                this.drawPixel(x + 1, y + 1);
                this.drawPixel(x, y + 2);
                this.drawPixel(x + 2, y + 2);
                this.drawPixel(x, y + 3);
                this.drawPixel(x + 1, y + 3);
                this.drawPixel(x, y + 4);
                break;
            case dirs.DIR_DOWN:
                this.drawPixel(x + 2, y);
                this.drawPixel(x + 1, y +1);
                this.drawPixel(x + 2, y + 1);
                this.drawPixel(x, y + 2);
                this.drawPixel(x + 2, y + 2);
                this.drawPixel(x + 1, y + 3);
                this.drawPixel(x + 2, y + 3);
                this.drawPixel(x + 1, y + 4);
                this.drawPixel(x + 2, y + 4);
                break;
        }

    }

    drawBody(x, y) {
        this.drawPixel(x + 2, y);
        this.drawPixel(x + 3, y);
        this.drawPixel(x + 4, y);
        this.drawPixel(x + 1, y + 1);
        this.drawPixel(x + 2, y + 1);
        this.drawPixel(x + 3, y + 1);
    }

    drawTail(x, y) {
        this.drawPixel(x + 2, y);
        this.drawPixel(x + 3, y);
        this.drawPixel(x + 4, y);
        this.drawPixel(x + 5, y);
        this.drawPixel(x + 1, y + 1);
        this.drawPixel(x + 2, y + 1);
        this.drawPixel(x + 3, y + 1);
        this.drawPixel(x + 4, y + 1);
    }
}

const canvas = new Canvas();

export default canvas;
