import * as config from '../config';
import {Apple} from './model/apple.model';
import {Canvas} from './canvas';
import {DirectionEnum} from './enums/direction.enum';
import {BodyPartEnum} from './enums/body-part.enum';
import {Position} from './model/position.model';
import {BodyPart} from './model/body-part.model';
import {clone} from './utils/utils';
import {Pixel} from './model/pixel.model';
import {drawData} from './data/drawData';
import {Rectangle} from './model/rectangle.model';

export class Snake {
    private canvas: Canvas;
    private body: BodyPart[];
    private oldBody: BodyPart[];
    private direction: DirectionEnum = DirectionEnum.RIGHT;
    private lastDirection: DirectionEnum = DirectionEnum.RIGHT;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.body = this.getInitialState();
        this.oldBody = this.getInitialState();
    }

    public endGame(): void {
        this.body = this.getOldBodyData();
    }

    public turnLeft(): void {
        this.lastDirection = this.direction;
        if (this.direction !== DirectionEnum.RIGHT) {
            this.direction = DirectionEnum.LEFT;
        }
    }
    public turnRight(): void {
        this.lastDirection = this.direction;
        if (this.direction !== DirectionEnum.LEFT) {
            this.direction = DirectionEnum.RIGHT;
        }
    }
    public turnUp(): void {
        this.lastDirection = this.direction;
        if (this.direction !== DirectionEnum.DOWN) {
            this.direction = DirectionEnum.UP;
        }
    }
    public turnDown(): void {
        this.lastDirection = this.direction;
        if (this.direction !== DirectionEnum.UP) {
            this.direction = DirectionEnum.DOWN;
        }
    }

    public move(): void {
        this.oldBody = this.getBodyData();
        const head = this.body[0];
        head.type = BodyPartEnum.BODY;
        const headPosition = new Position(
            head.position.x,
            head.position.y,
        );

        if (this.direction !== this.lastDirection) {
            switch (this.lastDirection) {
                case DirectionEnum.RIGHT:
                    headPosition.x += (config.MOVE + 1);
                    headPosition.y -= 1;
                    break;
                case DirectionEnum.UP:
                    headPosition.x -= 1;
                    headPosition.y -= (config.MOVE - 1);
                    break;
                case DirectionEnum.LEFT:
                    headPosition.x -= (config.MOVE - 1);
                    headPosition.y -= 1;
                    break;
                case DirectionEnum.DOWN:
                    headPosition.x -= 1;
                    headPosition.y += config.MOVE + 1;
                    break;
            }
        } else {
            switch (this.direction) {
                case DirectionEnum.RIGHT:
                    headPosition.x += config.MOVE;
                    break;
                case DirectionEnum.LEFT:
                    headPosition.x -= config.MOVE;
                    break;
                case DirectionEnum.UP:
                    headPosition.y -= config.MOVE;
                    break;
                case DirectionEnum.DOWN:
                    headPosition.y += config.MOVE;
                    break;
            }
        }

        this.canvas.handleBounrady(headPosition, this.direction);

        this.body.unshift(new BodyPart(
            BodyPartEnum.HEAD,
            headPosition,
            this.direction,
        ));
        this.body.pop();
        this.body[this.body.length - 1].type = BodyPartEnum.TAIL;
        this.lastDirection = this.direction;
    }

    public draw(): void {
        const body = this.getBodyData();
        for (let i = 0; i < body.length; i += 1) {
            const prevPart = (i > 0) ? body[i - 1] : null;
            const nextPart = (i < body.length) ? body[i + 1] : null;
            this.canvas.drawPart(body[i], prevPart, nextPart);
        }
        this.canvas.drawMask();
    }

    public reset (): void {
        this.body = this.getInitialState();
        this.direction = DirectionEnum.RIGHT;
        this.lastDirection = DirectionEnum.RIGHT;
    }

    public didEatApple(apple: Apple): boolean {
        return this.didHit(new Position(apple.x + 1, apple.y + 1));
    }

    public withinApple(apple: Apple): boolean {
        for (let i = 0; i < this.body.length; i += 1) {
            const partBoundary: Rectangle = this.getPartBoundary(i);

            const result = apple.x >= partBoundary.begin.x && apple.x <= partBoundary.end.x &&
                apple.y >= partBoundary.begin.y && apple.y <= partBoundary.end.y
                ;
            if (result) {
                return true;
            }
        }
        return false;
    }

    public didHit(position: Position): boolean {
        const headBoundary: Rectangle = this.getPartBoundary(0);
        return position.x >= headBoundary.begin.x && position.x <= headBoundary.end.x &&
            position.y >= headBoundary.begin.y && position.y <= headBoundary.end.y
        ;
    }

    public grow(): void {
        this.body[this.body.length - 1].type = BodyPartEnum.BODY;
        this.body.push(this.oldBody[this.oldBody.length - 1]);
    }

    public hasCollision(): boolean {
        return this.checkSelfCollision();
    }

    public getPixels(): Pixel[] {
        const boundary: Pixel[] = [];
        for (let i = 0; i < this.body.length; i += 1) {
            const partBoundary: Rectangle = this.getPartBoundary(i);
            for (let j = partBoundary.begin.x; j <= partBoundary.end.x; j += 1) {
                for (let k = partBoundary.begin.y; k <= partBoundary.end.y; k += 1) {
                    boundary.push(new Pixel(j, k));
                }
            }
        }
        return boundary;
    }

    private buildInitialPart (type: BodyPartEnum, position: Position): BodyPart {
        return new BodyPart(type, position, DirectionEnum.RIGHT);
    }

    private getInitialState (): BodyPart[] {
        const bodyLength = config.INIT_LENGTH;
        const initialState = [
            this.buildInitialPart(
                BodyPartEnum.HEAD,
                new Pixel(config.INIT_HEAD.x, config.INIT_HEAD.y),
            ),
        ];
        for (let i = 1; i <= bodyLength; i += 1) {
            initialState.push(this.buildInitialPart(
                BodyPartEnum.BODY,
                new Pixel(config.INIT_HEAD.x - i * config.MOVE, config.INIT_HEAD.y)),
            );
        }
        initialState.push(this.buildInitialPart(
            BodyPartEnum.TAIL, new Pixel(config.INIT_HEAD.x - (bodyLength + 1) * config.MOVE, config.INIT_HEAD.y)),
        );

        return initialState;
    }

    private getBodyData(): BodyPart[] {
        return clone(this.body);
    }

    private getOldBodyData(): BodyPart[] {
        return clone(this.oldBody);
    }

    private getPartBoundary(index: number): Rectangle {
        const part: BodyPart = this.body[index];
        const prevPart: BodyPart = index > 0 ? this.body[index - 1] : this.body[index];
        const nextPart: BodyPart = index < this.body.length - 1 ? this.body[index + 1] : this.body[index];
        let partData: Pixel[];
        switch (part.type) {
            case BodyPartEnum.HEAD:
                partData = drawData.head[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.BODY:
                partData = drawData.body[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.TAIL:
                partData = drawData.tail[part.direction][prevPart.direction][nextPart.direction];
                break;
        }

        let minX = 1000;
        let maxX = 0;
        let minY = 1000;
        let maxY = 0;
        partData.forEach((elem: Pixel) => {
            const x = part.position.x + elem.x;
            const y = part.position.y + elem.y;
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

        return new Rectangle(
            new Position(minX, minY),
            new Position(maxX, maxY),
        );
    }

    private getNose(): Pixel {
        const headElem = this.body[0];
        switch (headElem.direction) {
            case DirectionEnum.RIGHT:
                return {
                    x: headElem.position.x + 4,
                    y: headElem.position.y,
                };
            case DirectionEnum.UP:
                return {
                    x: headElem.position.x - 1,
                    y: headElem.position.y - 4,
                };
            case DirectionEnum.LEFT:
                return {
                    x: headElem.position.x - 5,
                    y: headElem.position.y,
                };
            case DirectionEnum.DOWN:
                return {
                    x: headElem.position.x -1,
                    y: headElem.position.y +5,
                };

        }
    }

    private checkSelfCollision(): boolean {
        const nose = this.getNose();
        return this.getBodyData().filter((part, index) => {
            if (index === 0) {
                return false;
            }

            const elem: Rectangle = this.getPartBoundary(index);
            return nose.x >= elem.begin.x && nose.x <= elem.end.x &&
                nose.y >= elem.begin.y && nose.y <= elem.end.y
            ;
        }).length > 0;
    }

}
