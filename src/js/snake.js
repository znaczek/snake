import canvas from './canvas';

const MOVE = 4;

export const DIR_RIGHT = 'right';
export const DIR_LEFT = 'left';
export const DIR_UP = 'up';
export const DIR_DOWN = 'down';
const INIT_HEAD = {
    x: 34,
    y: 18,
};
const buildPart = (part, x, y) => {
    return {
        type: part,
        pos: {
            x: x,
            y: y
        },
        direction: DIR_RIGHT,
    };
};

const getInitialState = () => {
    const bodyLength = 4;
    const initialState = [buildPart('head', INIT_HEAD.x, INIT_HEAD.y)];
    for (let i = 1; i <= bodyLength; i += 1) {
        initialState.push(buildPart('body', INIT_HEAD.x - i * 4, INIT_HEAD.y));
    }
    initialState.push(buildPart('tail', INIT_HEAD.x - (bodyLength + 1) * 4, INIT_HEAD.y));
    return Object.values(Object.assign({}, initialState));
};

class Snake {
    constructor() {
        this.body = getInitialState();
        this.direction = DIR_RIGHT;
        this.lastDirection = DIR_RIGHT;
    }

    turnLeft() {
        this.lastDirection = this.direction;
        if (this.direction !== DIR_RIGHT) {
            this.direction = DIR_LEFT;
        }
    }
    turnRight() {
        this.lastDirection = this.direction;
        if (this.direction !== DIR_LEFT) {
            this.direction = DIR_RIGHT;
        }
    }
    turnUp() {
        this.lastDirection = this.direction;
        if (this.direction !== DIR_DOWN) {
            this.direction = DIR_UP;
        }
    }
    turnDown() {
        this.lastDirection = this.direction;
        if (this.direction !== DIR_UP) {
            this.direction = DIR_DOWN;
        }
    }

    move() {
        const head = this.body[0];
        head.type = 'body';
        const pos = {
            x: head.pos.x,
            y: head.pos.y,
        };
        if (this.direction !== this.lastDirection) {
            switch (this.lastDirection) {
                case DIR_RIGHT:
                    pos.x += (MOVE + 1);
                    pos.y -= 1;
                    break;
                case DIR_UP:
                    pos.x -= 1;
                    pos.y -= (MOVE - 1);
                    break;
                case DIR_LEFT:
                    pos.x -= (MOVE - 1);
                    pos.y -= 1;
                    break;
                case DIR_DOWN:
                    pos.x -= 1;
                    pos.y += MOVE + 1;
                    break;
            }
        } else {
            switch (this.direction) {
                case DIR_RIGHT:
                    pos.x += MOVE;
                    break;
                case DIR_LEFT:
                    pos.x -= MOVE;
                    break;
                case DIR_UP:
                    pos.y -= MOVE;
                    break;
                case DIR_DOWN:
                    pos.y += MOVE;
                    break;
            }
        }

        canvas.handleBounrady(pos, this.direction);

        this.body.unshift({
            type: 'head',
            pos: pos,
            direction: this.direction
        });
        this.body.pop();
        this.body[this.body.length - 1].type = 'tail';
        this.lastDirection = this.direction;
    }

    draw() {
        for (let i = 0; i < this.body.length; i += 1) {
            const prevPart = (i > 0) ? this.body[i - 1] : null;
            const nextPart = (i < this.body.length) ? this.body[i + 1] : null;
            canvas.drawPart(this.body[i], prevPart, nextPart);
        }
        canvas.drawMask();
    }

    reset () {
        this.body = getInitialState();
        this.direction = DIR_RIGHT;
        this.lastDirection = DIR_RIGHT;
    }

}

export default Snake;
