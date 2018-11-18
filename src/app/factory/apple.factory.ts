import * as config from '../../config';
import {Apple} from '../model/apple.model';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';
import {Bug} from '../model/bug.model';
import {BugTypesEnum} from '../enums/bug-types.enum';

export class MealFactory {
    private readonly allAvailableApplePositions: Position[] = [];

    constructor() {
        const xMaxAppleBeginCoord = this.getMaxAppleBeginCoord(config.GAME_CANVAS_WIDTH);
        const yMaxAppleBeginCoord = this.getMaxAppleBeginCoord(config.GAME_CANVAS_HEIGHT);
        for (let i = 0; i <= xMaxAppleBeginCoord; i += config.MOVE) {
            for (let j = 0; j <= yMaxAppleBeginCoord; j += config.MOVE) {
                this.allAvailableApplePositions.push(
                    new Pixel(i, j),
                );
            }
        }
    }

    public generateApple(forbiddenPixels: Pixel[]): Apple {
        const chosenPosition: Position = this.getAvailableStartPosition(forbiddenPixels, 3, 3);
        return new Apple(chosenPosition.x, chosenPosition.y);
    }

    public generateBug(forbiddenPixels: Pixel[]): Bug {
        const chosenPosition: Position = this.getAvailableStartPosition(forbiddenPixels, 3, 7);
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
        this.allAvailableApplePositions.forEach((availableApple) => {
            const forbiddenPixelsNotOnApple = forbiddenPixels.filter((forbidden) => {
                return forbidden.x < availableApple.x ||
                    forbidden.x > availableApple.x + xSpace ||
                    forbidden.y < availableApple.y ||
                    forbidden.y > availableApple.y + ySpace;
            });
            if (forbiddenPixelsNotOnApple.length === forbiddenPixels.length) {
                availablePositions.push(new Apple(availableApple.x, availableApple.y));
            } else {
                forbiddenPixels = forbiddenPixelsNotOnApple;
            }
        });
        return availablePositions[Math.floor(Math.random() * (availablePositions.length))];
    }

    private getMaxAppleBeginCoord(max: number): number {
        return max - config.MOVE * 2;
    }

}
