import * as config from '../../../../config';
import {Position} from '../../../common/model/position.model';
import {Pixel} from '../../../common/model/pixel.model';
import {ColorsEnum} from '../../../common/enums/color.enums';

export const getGameBoardOffset = (): Position => {
    return new Position(
        config.BOARD.start.x,
        config.BOARD.start.y + config.TOP_BAR_HEIGHT,
    );
};

export const getGameBoarderPixels = (): Pixel[] => {
    const pixels: Pixel[] = [];
    for (
        let i = config.TOP_BAR_HEIGHT;
        i < config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT;
        i += 1
    ) {
        pixels.push(new Pixel(0, i));
        pixels.push(new Pixel(config.GAME_CANVAS_WIDTH - 1, i));
    }
    for (
        let i = 0;
        i < config.GAME_CANVAS_WIDTH;
        i += 1
    ) {
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT));
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT - 2));
        pixels.push(new Pixel(i, config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT - 1));
    }
    return pixels;
};

export const getMaskPixels = (): Pixel[] => {
    const pixels: Pixel[] = [];
    const color = config.DEBUG_CANVAS ? ColorsEnum.RED : ColorsEnum.GREEN;
    for (
        let i = config.BOARD.start.y + config.TOP_BAR_HEIGHT - 1;
        i < config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT - 1;
        i += 1
    ) {
        pixels.push(new Pixel(1, i, color));
        pixels.push(new Pixel(config.GAME_CANVAS_WIDTH - 2, i, color));
    }
    for (
        let i = 1;
        i < config.GAME_CANVAS_WIDTH - 1;
        i += 1
    ) {
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT -1, color));
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT + 1, color));
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT + config.GAME_CANVAS_HEIGHT - 2, color));
    }

    return pixels;
};

export const checkCollision = (a: Pixel[], b: Pixel[]) => {
    return a.some((pixelA) => b.some((pixelB) => {
        return pixelA.x === pixelB.x && pixelA.y === pixelB.y;
    }));
};
