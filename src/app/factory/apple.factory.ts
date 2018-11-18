import * as config from '../../config';
import {Apple} from '../model/apple.model';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export class AppleFactory {
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

    public generate(forbiddenPixels: Pixel[]): Apple {
        const availableApples: Pixel[] = [];
        this.allAvailableApplePositions.forEach((availableApple) => {
            const forbiddenPixelsNotOnApple = forbiddenPixels.filter((forbidden) => {
                return forbidden.x < availableApple.x ||
                    forbidden.x > availableApple.x + 2 ||
                    forbidden.y < availableApple.y ||
                    forbidden.y > availableApple.y + 2;
            });
            if (forbiddenPixelsNotOnApple.length === forbiddenPixels.length) {
                availableApples.push(new Apple(availableApple.x, availableApple.y));
            } else {
                forbiddenPixels = forbiddenPixelsNotOnApple;
            }
        });

        return availableApples[Math.floor(Math.random() * (availableApples.length))];
    }

    private getMaxAppleBeginCoord(max: number): number {
        return max - config.MOVE * 2;
    }

}
