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
import {EatenMeal} from './model/eaten-meal.model';
import {DrawableInterface} from './interfaces/drawable.interface';

export class Snake implements DrawableInterface {
    private canvas: Canvas;
    private body: BodyPart[];
    private length: number;
    private oldBody: BodyPart[];
    private eatenMeals: EatenMeal[] = [];
    private direction: DirectionEnum = DirectionEnum.RIGHT;
    private lastDirection: DirectionEnum = DirectionEnum.RIGHT;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.body = this.getInitialState();
        this.oldBody = this.getInitialState();
        this.length = this.body.length;
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
        const head = this.getHead();
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
        this.eatenMeals.forEach((meal: EatenMeal) => {
            meal.duration -= 1;
            if (meal.isNew) {
                meal.nextDirection = this.getHead().direction;
                meal.isNew = false;
            }
        });
    }

    public checkAtMoveEnd(): void {
        this.eatenMeals = this.eatenMeals.filter((meal: EatenMeal) => meal.duration !== 0);
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
        this.length += 1;

        const head = this.getHead();
        const xOffset = head.direction === DirectionEnum.RIGHT ? 2 :
            head.direction === DirectionEnum.LEFT ? -1 : 0;
        const yOffset = head.direction === DirectionEnum.DOWN ? 2 :
            head.direction === DirectionEnum.UP ? -1 : 0;
        this.eatenMeals.forEach((meal) => meal.duration += 1);
        this.eatenMeals.push(new EatenMeal(
            new Position(
                this.getPartBoundary(0).begin.x + xOffset,
                this.getPartBoundary(0).begin.y + yOffset,
            ),
            this.getHead().direction,
            this.length,
        ));
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

    public getPixels(options: {
        mealPixels: Pixel[][],
    }): Pixel[] {
        const snakePixels: Pixel[] = this.body.reduce((acc: Pixel[], _, index: number) => {
            const pixels: Pixel[] = this.getPartPixels(index);
            if (index === 0) {
                const head = this.getHead();
                const futureHeadPosition = this.handleBoundary(this.getNewHeadPosition(head.position));
                const futureHead = new BodyPart(
                    BodyPartEnum.HEAD,
                    futureHeadPosition,
                    head.direction,
                );
                options.mealPixels.forEach((pxs) => {
                    if (isOverlapping(getRectangleFromPixels(pxs),getRectangleFromPixels(this.getPartPixels(0, futureHead)))) {
                        switch (head.direction) {
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

        this.eatenMeals.forEach((meal: EatenMeal) => {
            if (meal.isNew) {
                return;
            }
            snakePixels.push(...this.getEatenMealPixels(meal));
        });
        return snakePixels;
    }

    private getEatenMealPixels(meal: EatenMeal): Pixel[] {
        const eatenMealPixels: Pixel[] = [];
        if (meal.previousDirection === meal.nextDirection) {
            if (meal.previousDirection === DirectionEnum.RIGHT || meal.previousDirection === DirectionEnum.LEFT) {
                eatenMealPixels.push(
                    new Pixel(meal.position.x + 1, meal.position.y),
                    new Pixel(meal.position.x + 2, meal.position.y),
                    new Pixel(meal.position.x + 1, meal.position.y + 3),
                    new Pixel(meal.position.x + 2, meal.position.y + 3),
                );
            } else {
                eatenMealPixels.push(
                    new Pixel(meal.position.x, meal.position.y + 1),
                    new Pixel(meal.position.x, meal.position.y + 2),
                    new Pixel(meal.position.x + 3, meal.position.y + 1),
                    new Pixel(meal.position.x + 3, meal.position.y + 2),
                );
            }
        } else {
            if (
                meal.previousDirection === DirectionEnum.RIGHT && meal.nextDirection === DirectionEnum.DOWN ||
                meal.previousDirection === DirectionEnum.UP && meal.nextDirection === DirectionEnum.LEFT
            ) {
                eatenMealPixels.push(new Pixel(meal.position.x, meal.position.y + 3));
            } else if (
                meal.previousDirection === DirectionEnum.RIGHT && meal.nextDirection === DirectionEnum.UP ||
                meal.previousDirection === DirectionEnum.DOWN && meal.nextDirection === DirectionEnum.LEFT
            ) {
                eatenMealPixels.push(new Pixel(meal.position.x, meal.position.y));
            } else if (
                meal.previousDirection === DirectionEnum.LEFT && meal.nextDirection === DirectionEnum.UP ||
                meal.previousDirection === DirectionEnum.DOWN && meal.nextDirection === DirectionEnum.RIGHT
            ) {
                eatenMealPixels.push(new Pixel(meal.position.x + 3, meal.position.y));
            } else if (
                meal.previousDirection === DirectionEnum.LEFT && meal.nextDirection === DirectionEnum.DOWN ||
                meal.previousDirection === DirectionEnum.UP && meal.nextDirection === DirectionEnum.RIGHT
            ) {
                eatenMealPixels.push(new Pixel(meal.position.x + 3, meal.position.y + 3));
            }
        }
        return eatenMealPixels;
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

    private getHead(): BodyPart {
        return this.body[0];
    }

    private getNose(): Pixel {
        const headElem = this.getHead();
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
