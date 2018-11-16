export const CANVAS_WIDTH = 96;
export const CANVAS_HEIGHT = 40;
export const MOVE = 4;
export const SPEED = 1000;

export const INIT_HEAD = {
    x: 34,
    y: 18,
};

export const INIT_LENGTH = 4;

export const MOVES: string[] = [
    'Right', 'Right',
    'Up', 'Up', 'Up',
    'Left', 'Left', 'Left', 'Left', 'Left', 'Left',
    'Down', 'Down', 'Down',
    'Right', 'Right', 'Right', 'Right',
    'Right', 'Right',
    'Down', 'Down', 'Down',
    'Left', 'Left', 'Left', 'Left', 'Left', 'Left',
    'Up', 'Up', 'Up',
    'Right', 'Right', 'Right', 'Right'
];

export const COLORS = {
    GREEN: '#a4c70b',
};

export const PIXEL_SIZE = 6;
export const CANVAS_WIDTH_PX = PIXEL_SIZE * CANVAS_WIDTH;
export const CANVAS_HEIGHT_PX = PIXEL_SIZE * CANVAS_HEIGHT;
export const BOARD_HEIGHT = CANVAS_HEIGHT - PIXEL_SIZE;
export const BOARD_WIDTH = CANVAS_WIDTH - PIXEL_SIZE;
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
