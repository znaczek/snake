import * as config from '../../../../config';
import {Position} from '../../../common/model/position.model';
import {Pixel} from '../../../common/model/pixel.model';

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
        pixels.push(new Pixel(i, config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT - 1));
    }
    return pixels;
};

export const getMaskPixels = (): Pixel[] => {
    const pixels: Pixel[] = [];
    for (
        let i = config.BOARD.start.y + config.TOP_BAR_HEIGHT - 1;
        i < config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT - 1;
        i += 1
    ) {
        pixels.push(new Pixel(1, i));
        pixels.push(new Pixel(config.GAME_CANVAS_WIDTH - 2, i));
    }
    for (
        let i = 1;
        i < config.GAME_CANVAS_WIDTH - 1;
        i += 1
    ) {
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT -1));
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT + 1));
        pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT + config.GAME_CANVAS_HEIGHT - 2));
    }

    return pixels;
};
