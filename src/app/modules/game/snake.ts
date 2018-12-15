import {Config} from '../../../Config';
import {DirectionEnum} from '../../common/enums/direction.enum';
import {BodyPartEnum} from './enums/body-part.enum';
import {Position} from '../../common/model/position.model';
import {BodyPart} from './model/body-part.model';
import {clone, getRectangleFromPixels, isOverlapping} from '../../common/utils/utils';
import {Pixel} from '../../common/model/pixel.model';
import {DRAW_DATA} from './data/snake.data';
import {Rectangle} from '../../common/model/rectangle.model';
import {Eatable} from './model/eatable.model';
import {EatenMeal} from './model/eaten-meal.model';
import {DrawableInterface} from '../../common/interfaces/drawable.interface';
import {SavedSnake} from './model/saved-snake.model';
import {checkCollision} from './utils/utils';

export class Snake implements DrawableInterface {
    private body: BodyPart[];
    private length: number;
    private oldBody: BodyPart[];
    private eatenMeals: EatenMeal[] = [];
    private direction: DirectionEnum = DirectionEnum.RIGHT;
    private lastDirection: DirectionEnum = DirectionEnum.RIGHT;

    constructor(start: Position) {
        this.body = this.getInitialState(start);
        this.oldBody = clone(this.body);
        this.length = this.body.length;
    }

    public serialize() {
        return new SavedSnake({
            body: this.body,
            length: this.length,
            oldBody: this.oldBody,
            eatenMeals: this.eatenMeals,
            direction: this.direction,
            lastDirection: this.lastDirection,
        });
    }

    public set(data: SavedSnake) {
        this.body = data.body;
        this.length = data.length;
        this.oldBody = data.oldBody;
        this.eatenMeals = data.eatenMeals;
        this.direction = data.direction;
        this.lastDirection = data.lastDirection;
    }

    public turnLeft(): void {
        if (this.lastDirection !== DirectionEnum.RIGHT) {
            this.direction = DirectionEnum.LEFT;
        }
    }
    public turnRight(): void {
        if (this.lastDirection !== DirectionEnum.LEFT) {
            this.direction = DirectionEnum.RIGHT;
        }
    }
    public turnUp(): void {
        if (this.lastDirection !== DirectionEnum.DOWN) {
            this.direction = DirectionEnum.UP;
        }
    }
    public turnDown(): void {
        if (this.lastDirection !== DirectionEnum.UP) {
            this.direction = DirectionEnum.DOWN;
        }
    }

    public move(): void {
        this.oldBody = this.getBodyData();
        const oldHead = this.getHead();
        oldHead.type = BodyPartEnum.BODY;
        const newHead = this.getNewHead(this.getHead());
        const proposedNewHeadPosition = new Position(
            newHead.position.x,
            newHead.position.y,
        );
        const recalculatedPosition =  this.getRecalculatedHeadPosition(newHead);
        newHead.position = recalculatedPosition;
        if (proposedNewHeadPosition.x !== recalculatedPosition.x ||
            proposedNewHeadPosition.y !== recalculatedPosition.y
        ) {
            this.body.unshift(new BodyPart(
                BodyPartEnum.BODY,
                proposedNewHeadPosition,
                this.direction,
            ));
        }
        this.body.unshift(newHead);
        this.body.pop();
        this.lastDirection = this.direction;
        this.eatenMeals.forEach((meal: EatenMeal) => {
            meal.duration -= 1;
            if (meal.isNew) {
                meal.nextDirection = this.getHead().direction;
                meal.isNew = false;
            }
        });
    }

    public handleMoveEnd(): void {
        if (this.didTailJumped()) {
            this.body.pop();
        }
        this.body[this.body.length - 1].type = BodyPartEnum.TAIL;
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

    public getBodyBoundaryPositions(): Position[] {
        const boundary: Position[] = [];
        for (let i = 0; i < this.body.length; i += 1) {
            const partBoundary: Rectangle = this.getPartBoundary(i);
            for (let j = partBoundary.begin.x; j <= partBoundary.end.x; j += 1) {
                for (let k = partBoundary.begin.y; k <= partBoundary.end.y; k += 1) {
                    boundary.push(new Position(j, k));
                }
            }
        }
        return boundary;
    }

    public checkSelfCollision(): boolean {
        const nose = this.getNose(this.getHead());
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

    public chekMazeColission(mazePixels: Pixel[]): boolean {
        return checkCollision(mazePixels, this.getPartPixels(0));
    }

    public restore() {
        this.body = this.oldBody;
    }

    public getPixels(options?: {
        additionalPixelsSets: Pixel[][],
    }): Pixel[] {
        const snakePixels: Pixel[] = this.body.reduce((acc: Pixel[], _, index: number) => {
            const pixels: Pixel[] = this.getPartPixels(index);
            if (index === 0) {
                const head = this.getHead();
                const futureHeadPosition = this.getRecalculatedHeadPosition(this.getNewHead(head));
                const futureHead = new BodyPart(
                    BodyPartEnum.HEAD,
                    futureHeadPosition,
                    head.direction,
                );
                if (options) {
                    (options.additionalPixelsSets || []).forEach((pxs) => {
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

    private didTailJumped() {
        const oldTail = this.oldBody[this.oldBody.length - 1];
        const newTail = this.body[this.body.length - 1];
        return Math.abs(oldTail.position.x - newTail.position.x) > Config.MOVE * 2 ||
            Math.abs(oldTail.position.y - newTail.position.y) > Config.MOVE * 2;
    }

    private getNewHead(head: BodyPart): BodyPart {
        const newHeadPosition = new Position(
            head.position.x,
            head.position.y,
        );
        if (this.direction !== this.lastDirection) {
            switch (this.lastDirection) {
                case DirectionEnum.RIGHT:
                    newHeadPosition.x += (Config.MOVE + 1);
                    newHeadPosition.y -= 1;
                    break;
                case DirectionEnum.UP:
                    newHeadPosition.x -= 1;
                    newHeadPosition.y -= (Config.MOVE - 1);
                    break;
                case DirectionEnum.LEFT:
                    newHeadPosition.x -= (Config.MOVE - 1);
                    newHeadPosition.y -= 1;
                    break;
                case DirectionEnum.DOWN:
                    newHeadPosition.x -= 1;
                    newHeadPosition.y += Config.MOVE + 1;
                    break;
            }
        } else {
            switch (this.direction) {
                case DirectionEnum.RIGHT:
                    newHeadPosition.x += Config.MOVE;
                    break;
                case DirectionEnum.LEFT:
                    newHeadPosition.x -= Config.MOVE;
                    break;
                case DirectionEnum.UP:
                    newHeadPosition.y -= Config.MOVE;
                    break;
                case DirectionEnum.DOWN:
                    newHeadPosition.y += Config.MOVE;
                    break;
            }
        }
        return new BodyPart(
            BodyPartEnum.HEAD,
            newHeadPosition,
            this.direction,
        );
    }

    private getRecalculatedHeadPosition(newHead: BodyPart): Position {
        const recalculatedPosition = new Position(newHead.position.x, newHead.position.y);
        const nose = this.getNose(newHead);
        if (this.direction === DirectionEnum.RIGHT && nose.x >= Config.BOARD.end.x) {
            recalculatedPosition.x -= (Config.BOARD_WIDTH);
        } else if (this.direction === DirectionEnum.LEFT && nose.x <= 0) {
            recalculatedPosition.x += (Config.BOARD_WIDTH);
        } else if (this.direction === DirectionEnum.DOWN && nose.y >= Config.BOARD.end.y) {
            recalculatedPosition.y -= (Config.BOARD_HEIGHT);
        } else if (this.direction === DirectionEnum.UP && nose.y <= 0) {
            recalculatedPosition.y += (Config.BOARD_HEIGHT);
        }
        return recalculatedPosition;
    }

    private buildInitialPart (type: BodyPartEnum, position: Position): BodyPart {
        return new BodyPart(type, position, DirectionEnum.RIGHT);
    }

    private getInitialState (start: Position): BodyPart[] {
        const bodyLength = Config.INIT_LENGTH;
        const initialState = [
            this.buildInitialPart(
                BodyPartEnum.HEAD,
                new Pixel(start.x, start.y),
            ),
        ];
        for (let i = 1; i <= bodyLength; i += 1) {
            initialState.push(this.buildInitialPart(
                BodyPartEnum.BODY,
                new Pixel(start.x - i * Config.MOVE, start.y)),
            );
        }
        initialState.push(this.buildInitialPart(
            BodyPartEnum.TAIL, new Pixel(start.x - (bodyLength + 1) * Config.MOVE, start.y)),
        );

        return initialState;
    }

    private getBodyData(): BodyPart[] {
        return clone(this.body);
    }

    private getPartPixels(index: number, relativePart: BodyPart = null): Pixel[] {
        const part: BodyPart = this.body[index];
        const prevPart: BodyPart = index > 0 ? this.body[index - 1] : this.body[index];
        const nextPart: BodyPart = index < this.body.length - 1 ? this.body[index + 1] : this.body[index];
        let partData: Pixel[];
        switch (part.type) {
            case BodyPartEnum.HEAD:
                partData = DRAW_DATA.head[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.BODY:
                partData = DRAW_DATA.body[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.TAIL:
                partData = DRAW_DATA.tail[part.direction][prevPart.direction][nextPart.direction];
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

    private getNose(headElem: BodyPart): Position {
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
