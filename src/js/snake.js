import * as config from './config';
import canvas from './canvas';
import {DIR_RIGHT, DIR_DOWN, DIR_UP, DIR_LEFT, head, tail, body} from './drawData';

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
        initialState.push(buildPart('body', INIT_HEAD.x - i * config.MOVE, INIT_HEAD.y));
    }
    initialState.push(buildPart('tail', INIT_HEAD.x - (bodyLength + 1) * config.MOVE, INIT_HEAD.y));
    return Object.values(Object.assign({}, initialState));
};

class Snake {
    constructor() {
        this.body = getInitialState();
        this.oldBody = getInitialState();
        this.direction = DIR_RIGHT;
        this.lastDirection = DIR_RIGHT;
    }

    getBodyData() {
        return JSON.parse(JSON.stringify(this.body));
    }

    getOldBodyData() {
        return JSON.parse(JSON.stringify(this.oldBody));
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
        this.oldBody = this.getBodyData();
        const head = this.body[0];
        head.type = 'body';
        const pos = {
            x: head.pos.x,
            y: head.pos.y,
        };
        if (this.direction !== this.lastDirection) {
            switch (this.lastDirection) {
                case DIR_RIGHT:
                    pos.x += (config.MOVE + 1);
                    pos.y -= 1;
                    break;
                case DIR_UP:
                    pos.x -= 1;
                    pos.y -= (config.MOVE - 1);
                    break;
                case DIR_LEFT:
                    pos.x -= (config.MOVE - 1);
                    pos.y -= 1;
                    break;
                case DIR_DOWN:
                    pos.x -= 1;
                    pos.y += config.MOVE + 1;
                    break;
            }
        } else {
            switch (this.direction) {
                case DIR_RIGHT:
                    pos.x += config.MOVE;
                    break;
                case DIR_LEFT:
                    pos.x -= config.MOVE;
                    break;
                case DIR_UP:
                    pos.y -= config.MOVE;
                    break;
                case DIR_DOWN:
                    pos.y += config.MOVE;
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
        const body = this.getBodyData();
        for (let i = 0; i < body.length; i += 1) {
            const prevPart = (i > 0) ? body[i - 1] : null;
            const nextPart = (i < body.length) ? body[i + 1] : null;
            canvas.drawPart(body[i], prevPart, nextPart);
        }
        canvas.drawMask();
    }

    reset () {
        this.body = getInitialState();
        this.direction = DIR_RIGHT;
        this.lastDirection = DIR_RIGHT;
    }

    didEatApple({x, y}) {
        return this.didHit(x + 1, y + 1);
    }

    didHit(x, y) {
        const headBoundary = this.getPartBoundary(0);
        return x >= headBoundary.begin.x && x <= headBoundary.end.x &&
            y >= headBoundary.begin.y && y <= headBoundary.end.y
        ;
    }

    getPartBoundary(index) {
        const part = this.getBodyData()[index];
        const prevPart = index > 0 ? this.getBodyData()[index - 1] : this.getBodyData()[index];
        const nextPart = index < this.getBodyData().length - 1 ?  this.getBodyData()[index + 1] : this.getBodyData()[index];
        let partData;
        switch (part.type) {
            case 'head':
                partData = head[part.direction][prevPart.direction][nextPart.direction];
                break;
            case 'body':
                partData = body[part.direction][prevPart.direction][nextPart.direction];
                break;
            case 'tail':
                partData = tail[part.direction][prevPart.direction][nextPart.direction];
                break;
        }

        let minX = 1000;
        let maxX = 0;
        let minY = 1000;
        let maxY = 0;
        partData.forEach((elem) => {
            const x = part.pos.x + elem[0];
            const y = part.pos.y + elem[1];
            if (x < minX) {
                minX = x;
            }
            if (x > maxX) {
                maxX = x;
            }
            if (y < minY) {
                minY = y;
            }
            if (y > maxY) {
                maxY = y;
            }
        });

        return {
            begin: {
                x: minX,
                y: minY,
            },
            end: {
                x: maxX,
                y: maxY,
            }
        };
    }

    grow() {
        this.body[this.body.length - 1].type = 'body';
        this.body.push(this.oldBody[this.oldBody.length - 1]);
    }

    hasCollision() {
        return this.checkSelfCollision();
    }

    getNose() {
        const headElem = this.body[0];
        switch (headElem.direction) {
            case DIR_RIGHT:
                return {
                    x: headElem.pos.x + 4,
                    y: headElem.pos.y,
                };
            case DIR_UP:
                return {
                    x: headElem.pos.x - 1,
                    y: headElem.pos.y - 4,
                };
            case DIR_LEFT:
                return {
                    x: headElem.pos.x - 5,
                    y: headElem.pos.y,
                };
            case DIR_DOWN:
                return {
                    x: headElem.pos.x -1,
                    y: headElem.pos.y +5,
                };

        }
        return this.getPartBoundary(0);
    }
    checkSelfCollision() {
        const nose = this.getNose();
        return this.getBodyData().filter((part, index) => {
            if (index === 0) return false;
            const elem = this.getPartBoundary(index);
            return nose.x >= elem.begin.x && nose.x <= elem.end.x &&
                nose.y >= elem.begin.y && nose.y <= elem.end.y
            ;
        }).length > 0;
    }

    endGame() {
        this.body = this.getOldBodyData();
    }

}

export default Snake;
