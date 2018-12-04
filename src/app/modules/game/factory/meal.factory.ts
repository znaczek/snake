import * as config from '../../../../config';
import {Apple} from '../model/apple.model';
import {Pixel} from '../../../common/model/pixel.model';
import {Position} from '../../../common/model/position.model';
import {Bug} from '../model/bug.model';
import {BugTypesEnum} from '../enums/bug-types.enum';
import {MealsEnum} from '../enums/meals.enum';

export class MealFactory {
    private readonly allAvailableMealPositions: {[index in MealsEnum]: Position[]} = {
        [MealsEnum.APPLE]: [],
        [MealsEnum.BUG]: [],
    };

    constructor() {
        for (let x = 0; x <= config.GAME_CANVAS_WIDTH; x += config.MOVE) {
            for (let y = 0; y <= config.GAME_CANVAS_HEIGHT; y += config.MOVE) {
                if (x <= config.GAME_CANVAS_WIDTH - Apple.width - config.MOVE &&
                    y <= config.GAME_CANVAS_HEIGHT - Apple.height - config.MOVE
                ) {
                    this.allAvailableMealPositions[MealsEnum.APPLE].push(new Pixel(x, y));
                }
                if (x <= config.GAME_CANVAS_WIDTH - Bug.width - config.MOVE &&
                    y <= config.GAME_CANVAS_HEIGHT - Bug.height - config.MOVE
                ) {
                    this.allAvailableMealPositions[MealsEnum.BUG].push(new Pixel(x, y));
                }
            }
        }
    }

    public generateApple(forbiddenPixels: Pixel[]): Apple {
        const chosenPosition: Position = this.getAvailableStartPosition(MealsEnum.APPLE, forbiddenPixels, Apple.width, Apple.height);
        return new Apple(chosenPosition.x, chosenPosition.y);
    }

    public generateBug(forbiddenPixels: Pixel[]): Bug {
        const chosenPosition: Position = this.getAvailableStartPosition(MealsEnum.BUG, forbiddenPixels, Bug.width, Bug.height);
        const bugTypesValues = Object.keys(BugTypesEnum)
            .map((n) => Number.parseInt(n, 10))
            .filter((n) => n === parseInt(n.toString(), 10));
        const type = Math.floor((Math.random() * bugTypesValues.length));
        return new Bug(chosenPosition.x, chosenPosition.y, type);
    }

    private getAvailableStartPosition(
            type: MealsEnum,
            forbiddenPixels: Pixel[],
            xSpace: number,
            ySpace: number,
        ): Position {
        const availablePositions: Position[] = [];
        this.allAvailableMealPositions[type].forEach((availableMealPosition) => {
            const pixelsForFutureChecking: Pixel[] = [];
            const forbiddenPixelsNotOnGivenAvailablePosition = forbiddenPixels.filter((forbidden) => {
                const isAboveOrOnLeft = forbidden.x < availableMealPosition.x || forbidden.y < availableMealPosition.y;
                const isBelowOrOnRight = forbidden.x >= availableMealPosition.x + xSpace ||
                    forbidden.y >= availableMealPosition.y + ySpace;
                const shouldBeCheckedInFuture = forbidden.x >= availableMealPosition.x + config.MOVE ||
                    forbidden.y >= availableMealPosition.y + config.MOVE;
                if (shouldBeCheckedInFuture) {
                    pixelsForFutureChecking.push(forbidden);
                }
                return isAboveOrOnLeft || isBelowOrOnRight;
            });
            if (forbiddenPixelsNotOnGivenAvailablePosition.length === forbiddenPixels.length) {
                availablePositions.push(new Position(availableMealPosition.x, availableMealPosition.y));
            } else {
                forbiddenPixels = pixelsForFutureChecking;
            }
        });
        return availablePositions[Math.floor(Math.random() * (availablePositions.length))];
    }

}
