import canvas from './canvas';

const MOVE = 4;

const DIR_RIGHT = 'right';
const DIR_LEFT = 'left';
const DIR_UP = 'up';
const DIR_DOWN = 'down';

class Snake {
    constructor() {
        this.body = [
            {
                type: 'head',
                pos: {
                    x: 30,
                    y: 20
                },
                dir: DIR_RIGHT
            },
            {
                type: 'body',
                pos: {
                    x: 25,
                    y: 21
                },
                dir: DIR_RIGHT
            },
            {
                type: 'body',
                pos: {
                    x: 21,
                    y: 21
                },
                dir: DIR_RIGHT
            },
            {
                type: 'body',
                pos: {
                    x: 17,
                    y: 21
                },
                dir: DIR_RIGHT
            },
            {
                type: 'tail',
                pos: {
                    x: 12,
                    y: 21
                },
                dir: DIR_RIGHT
            }
        ];
    }

    draw(direction) {
        for (let part of this.body) {

            part.pos.x += MOVE;


            switch (part.type) {
            case 'head':
                canvas.drawHead(part.pos.x, part.pos.y);
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
