import * as dirs from './snake';

let ctx = null;

const PIXEL_SIZE = 6;
const CANVAS_WIDTH = 96;
const CANVAS_HEIGHT = 40;
const CANVAS_WIDTH_PX = PIXEL_SIZE * CANVAS_WIDTH;
const CANVAS_HEIGHT_PX = PIXEL_SIZE * CANVAS_HEIGHT;
const BOARD_HEIGHT = CANVAS_HEIGHT - 6;
const BOARD_WIDTH = CANVAS_WIDTH - 6;
const BOARD = {
    start: {
        x: 2,
        y: 2
    },
    end: {
        x: 2 + BOARD_WIDTH,
        y: 2 + BOARD_HEIGHT
    }
};
const head = {
    [dirs.DIR_RIGHT]: [
        [2, -2],
        [1, -1],
        [3, -1],
        [4, -1],
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0]
    ],
    [dirs.DIR_UP]: [
        [-2, -4],
        [-1, -4],
        [-2, -3],
        [-1, -3],
        [-3, -2],
        [-1, -2],
        [-2, -1],
        [-1, -1],
        [-1, 0]
    ],
    [dirs.DIR_LEFT]: [
        [-3, -2],
        [-5, -1],
        [-4, -1],
        [-2, -1],
        [-5, 0],
        [-4, 0],
        [-3, 0],
        [-2, 0],
        [-1, 0]
    ],
    [dirs.DIR_DOWN]: [
        [-1, 1],
        [-2, 2],
        [-1, 2],
        [-3, 3],
        [-1, 3],
        [-2, 4],
        [-1, 4],
        [-2, 5],
        [-1, 5]
    ]
};
const body = {
    [dirs.DIR_RIGHT]: [
        [1, -1],
        [2, -1],
        [3, -1],
        [0, 0],
        [1, 0],
        [2, 0]
    ],
    [dirs.DIR_UP]: [
        [-2, -3],
        [-2, -2],
        [-1, -2],
        [-2, -1],
        [-1, -1],
        [-1, 0]
    ],
    [dirs.DIR_LEFT]: [
        [-4, -1],
        [-3, -1],
        [-2, -1],
        [-3, 0],
        [-2, 0],
        [-1, 0]
    ],
    [dirs.DIR_DOWN]: [
        [-1, 1],
        [-2, 2],
        [-1, 2],
        [-2, 3],
        [-1, 3],
        [-2, 4]
    ]
};

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

    clear() {
        ctx.clearRect(0, 0, CANVAS_WIDTH_PX, CANVAS_HEIGHT_PX);
    }

    drawPixel(x, y) {
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE -1 , PIXEL_SIZE -1);
    }

    drawGamePixel(x, y) {
        this.drawPixel(x + BOARD.start.x, y + BOARD.start.y);
    }

    drawGameBorder() {
        for (let i = 0; i < CANVAS_HEIGHT; i+=1) {
            this.drawPixel(0, i);
            this.drawPixel(CANVAS_WIDTH - 1, i);
        }
        for (let i = 0; i < CANVAS_WIDTH; i+=1) {
            this.drawPixel(i, 0);
            this.drawPixel(i, CANVAS_HEIGHT - 1);
        }

        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(BOARD.start.x * PIXEL_SIZE , BOARD.start.y * PIXEL_SIZE, BOARD.end.x * PIXEL_SIZE , BOARD.end.y * PIXEL_SIZE);
        ctx.restore();
    }

    prepareBoard() {
        this.clear();
        this.drawGameBorder();
    }

    handleBounrady(pos, direction) {
        if (direction === dirs.DIR_RIGHT && pos.x + 5 > BOARD.end.x) {
            pos.x -= (BOARD_WIDTH + 2);
        }
        if (direction === dirs.DIR_LEFT && pos.x - 5 < 0) {
            pos.x += (BOARD_WIDTH + 2);
        }
        if (direction === dirs.DIR_DOWN && pos.y + 5 > BOARD.end.y) {
            pos.y -= (BOARD_HEIGHT + 2);
        }
        if (direction === dirs.DIR_UP && pos.y - 5 < 0) {
            pos.y += (BOARD_HEIGHT + 2);
        }
    }

    drawPart(part) {
        switch (part.type) {
            case 'head':
                for (let pixel of head[part.direction]) {
                    this.drawGamePixel(part.pos.x + pixel[0], part.pos.y + pixel[1]);
                }
                break;
            case 'body':
                for (let pixel of body[part.direction]) {
                    this.drawGamePixel(part.pos.x + pixel[0], part.pos.y + pixel[1]);
                }
                break;
        }
    }

    clonePart(part) {
        const copy = Object.assign({}, part);
        switch (copy.direction) {
            case dirs.DIR_RIGHT:
                copy.pos.x += CANVAS_WIDTH - 4;
                break;
            case dirs.DIR_LEFT:
                copy.pos.x -= 4;
                break;
            case dirs.DIR_UP:
                copy.pos.y -= 4;
                break;
            case dirs.DIR_DOWN:
                copy.pos.y += 4;
                break;
        }
    }

}

const canvas = new Canvas();

export default canvas;
