import canvas from './canvas';

const MOVE = 4;

export const DIR_RIGHT = 'right';
export const DIR_LEFT = 'left';
export const DIR_UP = 'up';
export const DIR_DOWN = 'down';

class Snake {
    constructor() {
        this.direction = DIR_RIGHT;
        this.body = [
            {
                type: 'head',
                pos: {
                    x: 30,
                    y: 20
                },
                dir: DIR_RIGHT
            },
            // {
            //     type: 'body',
            //     pos: {
            //         x: 25,
            //         y: 21
            //     },
            //     dir: DIR_RIGHT
            // },
            // {
            //     type: 'body',
            //     pos: {
            //         x: 21,
            //         y: 21
            //     },
            //     dir: DIR_RIGHT
            // },
            // {
            //     type: 'body',
            //     pos: {
            //         x: 17,
            //         y: 21
            //     },
            //     dir: DIR_RIGHT
            // },
            // {
            //     type: 'tail',
            //     pos: {
            //         x: 12,
            //         y: 21
            //     },
            //     dir: DIR_RIGHT
            // }
        ];
    }

    turnLeft() {
        this.direction = DIR_LEFT;
    }
    turnRight() {
        this.direction = DIR_RIGHT;
    }
    turnUp() {
        this.direction = DIR_UP;
    }
    turnDown() {
        this.direction = DIR_DOWN;
    }

    draw() {
        for (let part of this.body) {
            switch (part.type) {
                case 'head':
                    switch (this.direction) {
                        case DIR_RIGHT:
                            part.pos.x += MOVE;
                            break;
                        case DIR_LEFT:
                            part.pos.x -= MOVE;
                            break;
                        case DIR_UP:
                            part.pos.y -= MOVE;
                            break;
                        case DIR_DOWN:
                            part.pos.y += MOVE;
                            break;
                    }
                    canvas.drawHead(part.pos.x, part.pos.y, this.direction);
                    break;
                case 'body':
                    canvas.drawBody(part.pos.x, part.pos.y);
                    break;
                case 'tail':
                    canvas.drawTail(part.pos.x, part.pos.y);
                    break;
            }
        }
    }
}

export default Snake;
