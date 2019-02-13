import {Config} from '../../../../config';
import {Position} from '../../../common/model/position.model';
import {Pixel} from '../../../common/model/pixel.model';
import {ColorsEnum} from '../../../common/enums/color.enums';

export class GameUtils {

    public static getGameBoardOffset(): Position {
        return new Position(
            Config.BOARD.start.x,
            Config.BOARD.start.y + Config.TOP_BAR_HEIGHT,
        );
    }

    public static getGameBoarderPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        for (
            let i = Config.TOP_BAR_HEIGHT;
            i < Config.GAME_CANVAS_HEIGHT + Config.TOP_BAR_HEIGHT;
            i += 1
        ) {
            pixels.push(new Pixel(0, i));
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 1, i));
        }
        for (
            let i = 0;
            i < Config.GAME_CANVAS_WIDTH;
            i += 1
        ) {
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT));
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT - 2));
            pixels.push(new Pixel(i, Config.GAME_CANVAS_HEIGHT + Config.TOP_BAR_HEIGHT - 1));
        }
        return pixels;
    }

    public static getMaskPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        const color = Config.DEBUG_CANVAS ? ColorsEnum.RED : ColorsEnum.GREEN;
        for (
            let i = Config.BOARD.start.y + Config.TOP_BAR_HEIGHT - 1;
            i < Config.GAME_CANVAS_HEIGHT + Config.TOP_BAR_HEIGHT - 1;
            i += 1
        ) {
            pixels.push(new Pixel(1, i, color));
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 2, i, color));
        }
        for (
            let i = 1;
            i < Config.GAME_CANVAS_WIDTH - 1;
            i += 1
        ) {
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT -1, color));
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT + 1, color));
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT + Config.GAME_CANVAS_HEIGHT - 2, color));
        }

        return pixels;
    }

    public static checkCollision(a: Pixel[], b: Pixel[]): boolean {
        return a.some((pixelA) => b.some((pixelB) => {
            return pixelA.x === pixelB.x && pixelA.y === pixelB.y;
        }));
    }
}
