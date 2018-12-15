import {DirectionEnum} from '../../../common/enums/direction.enum';
import {Pixel} from '../../../common/model/pixel.model';
import {DrawDataInterface} from '../interface/draw-data.interface';
import {Position} from '../../../common/model/position.model';

export const INIT_HEAD: {[index: number]: Position} = {
    1: {
        x: 34,
        y: 18,
    },
    2: {
        x: 34,
        y: 18,
    },
    3: {
        x: 22,
        y: 6,
    },
    4: {
        x: 34,
        y: 18,
    },
    5: {
        x: 34,
        y: 18,
    },
    6: {
        x: 34,
        y: 18,
    },
};

const COMMON = {
    head: {
        [DirectionEnum.RIGHT]: [
            // lips
            new Pixel(4, -1),
            // nose
            new Pixel(4, 0),
            // rest
            new Pixel(2, -2),
            new Pixel(1, -1),
            new Pixel(3, -1),
            new Pixel(1, 0),
            new Pixel(2, 0),
            new Pixel(3, 0),
        ],
        [DirectionEnum.UP]: [
            // lips
            new Pixel(-1, -4),
            // nose
            new Pixel(-2, -4),
            // rest
            new Pixel(-2, -3),
            new Pixel(-1, -3),
            new Pixel(-3, -2),
            new Pixel(-1, -2),
            new Pixel(-2, -1),
            new Pixel(-1, -1),
        ],
        [DirectionEnum.LEFT]: [
            // lips
            new Pixel(-5, 0),
            // nose
            new Pixel(-5, -1),
            // rest
            new Pixel(-3, -2),
            new Pixel(-4, -1),
            new Pixel(-2, -1),
            new Pixel(-4, 0),
            new Pixel(-3, 0),
            new Pixel(-2, 0),
        ],
        [DirectionEnum.DOWN]: [
            // lips
            new Pixel(-1, 5),
            // nose
            new Pixel(-2, 5),
            // rest
            new Pixel(-2, 2),
            new Pixel(-1, 2),
            new Pixel(-3, 3),
            new Pixel(-1, 3),
            new Pixel(-2, 4),
            new Pixel(-1, 4),
        ],
    },

    body: {
        [DirectionEnum.RIGHT]: [
            new Pixel(1, -1),
            new Pixel(2, -1),
            new Pixel(2, 0),
            new Pixel(1, 0),
        ],
        [DirectionEnum.UP]: [
            new Pixel(-2, -2),
            new Pixel(-1, -2),
            new Pixel(-2, -1),
            new Pixel(-1, -1),
        ],
        [DirectionEnum.LEFT]: [
            new Pixel(-3, -1),
            new Pixel(-2, -1),
            new Pixel(-3, 0),
            new Pixel(-2, 0),
        ],
        [DirectionEnum.DOWN]: [
            new Pixel(-2, 2),
            new Pixel(-1, 2),
            new Pixel(-2, 3),
            new Pixel(-1, 3),
        ],
    },

    tail: {
        [DirectionEnum.RIGHT]: [
            new Pixel(0, -1),
            new Pixel(1, -1),
            new Pixel(2, -1),
            new Pixel(-2, 0),
            new Pixel(-1, 0),
            new Pixel(0, 0),
            new Pixel(1, 0),
        ],
        [DirectionEnum.UP]: [
            new Pixel(-2, -2),
            new Pixel(-1, -2),
            new Pixel(-2, -1),
            new Pixel(-1, -1),
            new Pixel(-2, 0),
            new Pixel(-1, 0),
            new Pixel(-1, 1),
        ],
        [DirectionEnum.LEFT]: [
            new Pixel(-3, -1),
            new Pixel(-2, -1),
            new Pixel(-1, -1),
            new Pixel(-3, 0),
            new Pixel(-2, 0),
            new Pixel(-1, 0),
            new Pixel(0, 0),
        ],
        [DirectionEnum.DOWN]: [
            new Pixel(-1, -1),
            new Pixel(-1, 0),
            new Pixel(-2, 1),
            new Pixel(-1, 1),
            new Pixel(-2, 2),
            new Pixel(-1, 2),
            new Pixel(-2, 3),
        ],
    },
};

export const DRAW_DATA: DrawDataInterface = {
    head: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.head[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.head[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.head[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...COMMON.head[DirectionEnum.UP],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.head[DirectionEnum.UP],
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.head[DirectionEnum.UP],
                    new Pixel(-1, 0),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.head[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.head[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.head[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.head[DirectionEnum.DOWN],
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.head[DirectionEnum.DOWN],
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.head[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                ],
            },
        },
    },

    body: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.RIGHT],
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-2, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-1, 0),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-2, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    ...COMMON.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, -1),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-1, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-1, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...COMMON.body[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                    new Pixel(-1, 4),
                ],
            },
        },
    },

    tail: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    ...COMMON.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, -1),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...COMMON.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-2, -3),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    ...COMMON.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-1, -3),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    ...COMMON.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-2, -3),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    ...COMMON.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, 0),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    ...COMMON.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
            },
        },
    },
};
