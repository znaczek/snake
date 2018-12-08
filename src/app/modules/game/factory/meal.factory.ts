import {Config} from '../../../../Config';
import {Apple} from '../model/apple.model';
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
        for (let x = 0; x <= Config.GAME_CANVAS_WIDTH; x += Config.MOVE) {
            for (let y = 0; y <= Config.GAME_CANVAS_HEIGHT; y += Config.MOVE) {
                if (x <= Config.GAME_CANVAS_WIDTH - Apple.width - Config.MOVE &&
                    y <= Config.GAME_CANVAS_HEIGHT - Apple.height - Config.MOVE
                ) {
                    this.allAvailableMealPositions[MealsEnum.APPLE].push(new Position(x, y));
                }
                if (x <= Config.GAME_CANVAS_WIDTH - Bug.width - Config.MOVE &&
                    y <= Config.GAME_CANVAS_HEIGHT - Bug.height - Config.MOVE
                ) {
                    this.allAvailableMealPositions[MealsEnum.BUG].push(new Position(x, y));
                }
            }
        }
    }

    public generateApple(forbiddenPositions: Position[]): Apple {
        const chosenPosition: Position = this.getAvailableStartPosition(MealsEnum.APPLE, forbiddenPositions, Apple.width, Apple.height);
        return new Apple(chosenPosition.x, chosenPosition.y);
    }

    public generateBug(forbiddenPositions: Position[]): Bug {
        const chosenPosition: Position = this.getAvailableStartPosition(MealsEnum.BUG, forbiddenPositions, Bug.width, Bug.height);
        const bugTypesValues = Object.keys(BugTypesEnum)
            .map((n) => Number.parseInt(n, 10))
            .filter((n) => n === parseInt(n.toString(), 10));
        const type = Math.floor((Math.random() * bugTypesValues.length));
        return new Bug(chosenPosition.x, chosenPosition.y, type);
    }

    private getAvailableStartPosition(
            type: MealsEnum,
            forbiddenPosition: Position[],
            xSpace: number,
            ySpace: number,
        ): Position {
        const availablePositions: Position[] = [];
        this.allAvailableMealPositions[type].forEach((availableMealPosition) => {
            const positionsForFutureChecking: Position[] = [];
            const forbiddenPositionsNotOnGivenAvailablePosition = forbiddenPosition.filter((forbidden) => {
                const isAboveOrOnLeft = forbidden.x < availableMealPosition.x || forbidden.y < availableMealPosition.y;
                const isBelowOrOnRight = forbidden.x >= availableMealPosition.x + xSpace ||
                    forbidden.y >= availableMealPosition.y + ySpace;
                const shouldBeCheckedInFuture = forbidden.x >= availableMealPosition.x + Config.MOVE ||
                    forbidden.y >= availableMealPosition.y + Config.MOVE;
                if (shouldBeCheckedInFuture) {
                    positionsForFutureChecking.push(forbidden);
                }
                return isAboveOrOnLeft || isBelowOrOnRight;
            });
            if (forbiddenPositionsNotOnGivenAvailablePosition.length === forbiddenPosition.length) {
                availablePositions.push(new Position(availableMealPosition.x, availableMealPosition.y));
            } else {
                forbiddenPosition = positionsForFutureChecking;
            }
        });
        return availablePositions[Math.floor(Math.random() * (availablePositions.length))];
    }

}
