import * as config from '../../config';
import {Apple} from '../model/apple.model';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';
import {Bug} from '../model/bug.model';
import {BugTypesEnum} from '../enums/bug-types.enum';

export class MealFactory {
    private readonly allAvailableMealPositions: Position[] = [];

    constructor() {
        const xMaxAppleBeginCoord = this.getMaxAppleBeginCoord(config.GAME_CANVAS_WIDTH);
        const yMaxAppleBeginCoord = this.getMaxAppleBeginCoord(config.GAME_CANVAS_HEIGHT);
        for (let i = 0; i <= xMaxAppleBeginCoord; i += config.MOVE) {
            for (let j = 0; j <= yMaxAppleBeginCoord; j += config.MOVE) {
                this.allAvailableMealPositions.push(
                    new Pixel(i, j),
                );
            }
        }
    }

    public generateApple(forbiddenPixels: Pixel[]): Apple {
        const chosenPosition: Position = this.getAvailableStartPosition(forbiddenPixels, Apple.width, Apple.height);
        return new Apple(chosenPosition.x, chosenPosition.y);
    }

    public generateBug(forbiddenPixels: Pixel[]): Bug {
        const chosenPosition: Position = this.getAvailableStartPosition(forbiddenPixels, Bug.width, Bug.height);
        const bugTypesValues = Object.keys(BugTypesEnum)
            .map((n) => Number.parseInt(n, 10))
            .filter((n) => n === parseInt(n.toString(), 10));
        const type = Math.floor((Math.random() * bugTypesValues.length));
        return new Bug(chosenPosition.x, chosenPosition.y, type);
    }

    private getAvailableStartPosition(
            forbiddenPixels: Pixel[],
            xSpace: number,
            ySpace: number,
        ): Position {
        const availablePositions: Pixel[] = [];
        this.allAvailableMealPositions.forEach((availableMealPosition) => {
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

    private getMaxAppleBeginCoord(max: number): number {
        return max - config.MOVE * 2;
    }

}
