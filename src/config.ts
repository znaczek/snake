/**
 * Default parameters:
 * CANVAS_WIDTH = 96;
 * CANVAS_HEIGHT = 40;
 * MOVE = 4;
 * PIXEL_SIZE = 10;
 * INIT_LENGTH = 3;
 * INIT_HEAD = {x: 34, y: 18};
 */

export const DEBUG = false;
export const PIXEL_SIZE = 10;
export const TOP_BAR_HEIGHT = 9;
export const GAME_CANVAS_WIDTH = 96;
export const GAME_CANVAS_HEIGHT = 40;
export const MOVE = 4;
export const SPEED = 1000;

export const INIT_HEAD = {
    x: 34,
    y: 18,
};

export const INIT_LENGTH = 3;

export const CANVAS_WIDTH = GAME_CANVAS_WIDTH;
export const CANVAS_HEIGHT = GAME_CANVAS_HEIGHT + TOP_BAR_HEIGHT;
export const CANVAS_WIDTH_PX = PIXEL_SIZE * CANVAS_WIDTH;
export const CANVAS_HEIGHT_PX = PIXEL_SIZE * CANVAS_HEIGHT;
export const BOARD_HEIGHT = GAME_CANVAS_HEIGHT - 4;
export const BOARD_WIDTH = GAME_CANVAS_WIDTH - 4;
export const BOARD = {
    start: {
        x: 2,
        y: 2,
    },
    end: {
        x: 2 + BOARD_WIDTH,
        y: 2 + BOARD_HEIGHT,
    },
};
