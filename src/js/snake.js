import canvas from './canvas';

const MOVE = 4;

export const DIR_RIGHT = 'right';
export const DIR_LEFT = 'left';
export const DIR_UP = 'up';
export const DIR_DOWN = 'down';

const getInitialState = () => {
    const initialState = [
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
    return Object.values(Object.assign({}, initialState));
};

class Snake {
    constructor() {
        this.direction = DIR_RIGHT;
        this.body = getInitialState();
    }

    turnLeft() {
        if (this.direction !== DIR_RIGHT) {
            this.direction = DIR_LEFT;
        }
    }
    turnRight() {
        if (this.direction !== DIR_LEFT) {
            this.direction = DIR_RIGHT;
        }
    }
    turnUp() {
        if (this.direction !== DIR_DOWN) {
            this.direction = DIR_UP;
        }
    }
    turnDown() {
        if (this.direction !== DIR_UP) {
            this.direction = DIR_DOWN;
        }
    }

    draw() {
        console.log(this.body);
        for (let i = 0; i < this.body.length; i += 1) {
            const part = this.body[i];
            const forwardPart = i > 0 ? this.body[i - i] : null;
            const backwardPart = i < this.body.length ? this.body[i + i] : null;
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
                    const newDirection = forwardPart.dir !== part.dir ? part.dir : this.direction;
                    switch (newDirection) {
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
                    canvas.drawBody(part.pos.x, part.pos.y);
                    break;
                case 'tail':
                    canvas.drawTail(part.pos.x, part.pos.y);
                    break;
            }
            part.dir = this.direction;
        }
    }

    reset () {
        this.body = getInitialState();
    }

}

export default Snake;
