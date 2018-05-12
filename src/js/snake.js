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
            direction: DIR_RIGHT,
        },
        {
            type: 'body',
            pos: {
                x: 26,
                y: 20
            },
            direction: DIR_RIGHT,
        },
        {
            type: 'body',
            pos: {
                x: 22,
                y: 20
            },
            direction: DIR_RIGHT,
        },
        // {
        //     type: 'body',
        //     pos: {
        //         x: 17,
        //         y: 21
        //     },
        //     direction: DIR_RIGHT,
        // },
        // {
        //     type: 'tail',
        //     pos: {
        //         x: 12,
        //         y: 21
        //     },
        //     direction: DIR_RIGHT,
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

    move() {
        const head = this.body[0];
        head.type = 'body';
        const pos = {
            x: head.pos.x,
            y: head.pos.y,
        };
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

        this.body.unshift({
            type: 'head',
            pos: pos,
            direction: this.direction,
        });
        this.body.pop();
    }

    draw() {
        for (let part of this.body) {
            canvas.drawPart(part);
        }
    }

    reset () {
        this.body = getInitialState();
    }

}

export default Snake;
