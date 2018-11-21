import * as config from '../config';
import {Canvas} from './canvas';
import {DirectionEnum} from './enums/direction.enum';
import {BodyPartEnum} from './enums/body-part.enum';
import {Position} from './model/position.model';
import {BodyPart} from './model/body-part.model';
import {clone, getRectangleFromPixels, isOverlapping} from './utils/utils';
import {Pixel} from './model/pixel.model';
import {drawData} from './data/draw.data';
import {Rectangle} from './model/rectangle.model';
import {Eatable} from './interfaces/eatable';

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
        const newHeadPosition = this.getNewHeadPosition(head.position);
        const recalculatedPosition =  this.handleBoundary(newHeadPosition);
        if (newHeadPosition.x !== recalculatedPosition.x ||
            newHeadPosition.y !== recalculatedPosition.y
        ) {
            this.body.unshift(new BodyPart(
                BodyPartEnum.BODY,
                newHeadPosition,
                this.direction,
            ));
        }
        this.body.unshift(new BodyPart(
            BodyPartEnum.HEAD,
            recalculatedPosition,
            this.direction,
        ));
        const oldTail = this.body[this.body.length - 1];
        this.body.pop();
        const newTail = this.body[this.body.length - 1];
        if (this.didPartJumped(oldTail, newTail)) {
            this.body.pop();
        }
        this.body[this.body.length - 1].type = BodyPartEnum.TAIL;
        this.lastDirection = this.direction;
    }

    public didEat(meal: Eatable): boolean {
        if (!meal) {
            return false;
        }
        return this.didHit(meal);
    }

    public didHit(meal: Eatable): boolean {
        return isOverlapping(meal.getBoundary(), this.getPartBoundary(0));
    }

    public grow(): void {
        this.body[this.body.length - 1].type = BodyPartEnum.BODY;
        this.body.push(this.oldBody[this.oldBody.length - 1]);
    }

    public getBodyBoundaryPixels(): Pixel[] {
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

    public getPixels(mealPixels: Pixel[][]): Pixel[] {
        return this.body.reduce((acc: Pixel[], _, index: number) => {
            const pixels: Pixel[] = this.getPartPixels(index);
            if (index === 0) {
                const futureHeadPosition = this.handleBoundary(this.getNewHeadPosition(this.body[0].position));
                const futureHead = new BodyPart(
                    BodyPartEnum.HEAD,
                    futureHeadPosition,
                    this.body[0].direction,
                );
                mealPixels.forEach((pxs) => {
                    if (isOverlapping(getRectangleFromPixels(pxs),getRectangleFromPixels(this.getPartPixels(0, futureHead)))) {
                        switch (this.body[0].direction) {
                            case DirectionEnum.RIGHT: {
                                pixels[0].y -= 1;
                                pixels[1].y += 1;
                                break;
                            }
                            case DirectionEnum.UP: {
                                pixels[0].x += 1;
                                pixels[1].x -= 1;
                                break;
                            }
                            case DirectionEnum.LEFT: {
                                pixels[0].y += 1;
                                pixels[1].y -= 1;
                                break;
                            }
                            case DirectionEnum.DOWN: {
                                pixels[0].x += 1;
                                pixels[1].x -= 1;
                                break;
                            }
                        }
                    }
                });
            }
            return [...acc, ...pixels];
        }, []);
    }

    public checkSelfCollision(): boolean {
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

    private didPartJumped(prevPart: BodyPart, nextPart: BodyPart) {
        return Math.abs(prevPart.position.x - nextPart.position.x) > config.MOVE * 2 ||
            Math.abs(prevPart.position.y - nextPart.position.y) > config.MOVE * 2;
    }

    private getNewHeadPosition(headPosition: Position): Position {
        const newHeadPosition = new Position(
            headPosition.x,
            headPosition.y,
        );
        if (this.direction !== this.lastDirection) {
            switch (this.lastDirection) {
                case DirectionEnum.RIGHT:
                    newHeadPosition.x += (config.MOVE + 1);
                    newHeadPosition.y -= 1;
                    break;
                case DirectionEnum.UP:
                    newHeadPosition.x -= 1;
                    newHeadPosition.y -= (config.MOVE - 1);
                    break;
                case DirectionEnum.LEFT:
                    newHeadPosition.x -= (config.MOVE - 1);
                    newHeadPosition.y -= 1;
                    break;
                case DirectionEnum.DOWN:
                    newHeadPosition.x -= 1;
                    newHeadPosition.y += config.MOVE + 1;
                    break;
            }
        } else {
            switch (this.direction) {
                case DirectionEnum.RIGHT:
                    newHeadPosition.x += config.MOVE;
                    break;
                case DirectionEnum.LEFT:
                    newHeadPosition.x -= config.MOVE;
                    break;
                case DirectionEnum.UP:
                    newHeadPosition.y -= config.MOVE;
                    break;
                case DirectionEnum.DOWN:
                    newHeadPosition.y += config.MOVE;
                    break;
            }
        }
        return newHeadPosition;
    }

    private handleBoundary(newHeadPosition: Position): Position {
        const recalculatedPosition = new Position(newHeadPosition.x, newHeadPosition.y);
        if (this.direction === DirectionEnum.RIGHT && recalculatedPosition.x + 5 > config.BOARD.end.x) {
            recalculatedPosition.x -= (config.BOARD_WIDTH + 2);
        } else if (this.direction === DirectionEnum.LEFT && recalculatedPosition.x - 5 < 0) {
            recalculatedPosition.x += (config.BOARD_WIDTH + 2);
        } else if (this.direction === DirectionEnum.DOWN && recalculatedPosition.y + 5 > config.BOARD.end.y) {
            recalculatedPosition.y -= (config.BOARD_HEIGHT + 2);
        } else if (this.direction === DirectionEnum.UP && recalculatedPosition.y - 5 < 0) {
            recalculatedPosition.y += (config.BOARD_HEIGHT + 2);
        }
        return recalculatedPosition;
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

    private getPartPixels(index: number, relativePart: BodyPart = null): Pixel[] {
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
        const partPixels: Pixel[] = [];
        const sourcePart = relativePart ? relativePart : part;
        partData.forEach((elem: Pixel) => {
            partPixels.push(new Pixel(
                sourcePart.position.x + elem.x,
                sourcePart.position.y + elem.y,
            ));
        });
        return partPixels;
    }

    private getPartBoundary(index: number): Rectangle {
        return getRectangleFromPixels(this.getPartPixels(index));
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

}
