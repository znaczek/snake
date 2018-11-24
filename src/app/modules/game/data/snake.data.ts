import {DirectionEnum} from '../../../common/enums/direction.enum';
import {Pixel} from '../../../common/model/pixel.model';
import {DrawDataInterface} from '../interface/draw-data.interface';

const common = {
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

export const drawData: DrawDataInterface = {
    head: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    ...common.head[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                ],
                [DirectionEnum.UP]: [
                    ...common.head[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.head[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...common.head[DirectionEnum.UP],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.head[DirectionEnum.UP],
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.head[DirectionEnum.UP],
                    new Pixel(-1, 0),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...common.head[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.head[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    ...common.head[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...common.head[DirectionEnum.DOWN],
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.head[DirectionEnum.DOWN],
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.head[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                ],
            },
        },
    },

    body: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(0, -1),
                    new Pixel(3, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.RIGHT],
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-2, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, -3),
                    new Pixel(-1, 0),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-2, 0),
                    new Pixel(-2, -3),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.UP],
                    new Pixel(-1, 0),
                    new Pixel(-2, -3),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, 0),
                    new Pixel(-4, -1),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-1, -1),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    ...common.body[DirectionEnum.LEFT],
                    new Pixel(-4, 0),
                    new Pixel(-1, -1),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-2, 1),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-1, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.RIGHT]: [
                    ...common.body[DirectionEnum.DOWN],
                    new Pixel(-1, 4),
                    new Pixel(-1, 1),
                ],
                [DirectionEnum.LEFT]: [
                    ...common.body[DirectionEnum.DOWN],
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
                    ...common.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    ...common.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    ...common.tail[DirectionEnum.RIGHT],
                    new Pixel(2, 0),
                    new Pixel(3, -1),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    ...common.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-2, -3),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    ...common.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-1, -3),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    ...common.tail[DirectionEnum.UP],
                    new Pixel(-1, 2),
                    new Pixel(-2, -3),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    ...common.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    ...common.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, -1),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    ...common.tail[DirectionEnum.LEFT],
                    new Pixel(1, 0),
                    new Pixel(-4, 0),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    ...common.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    ...common.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    ...common.tail[DirectionEnum.DOWN],
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
            },
        },
    },
};
