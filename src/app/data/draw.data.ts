import {DirectionEnum} from '../enums/direction.enum';
import {Pixel} from '../model/pixel.model';
import {DrawDataInterface} from '../interfaces/draw-data.interface';

export const drawData: DrawDataInterface = {
    head: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    // lips
                    new Pixel(4, -1),
                    // nose
                    new Pixel(4, 0),
                    // rest
                    new Pixel(2, -2),
                    new Pixel(1, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),

                ],
                [DirectionEnum.UP]: [
                    // lips
                    new Pixel(4, -1),
                    // nose
                    new Pixel(4, 0),
                    // rest
                    new Pixel(2, -2),
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(3, -1),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.DOWN]: [
                    // lips
                    new Pixel(4, -1),
                    // nose
                    new Pixel(4, 0),
                    // rest
                    new Pixel(2, -2),
                    new Pixel(1, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
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
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
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
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
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
                    new Pixel(-1, 0),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
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
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
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
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    // lips
                    new Pixel(-5, 0),
                    // nose
                    new Pixel(-5, -1),
                    // rest
                    new Pixel(-3, -2),
                    new Pixel(-4, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-4, 0),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    // lips
                    new Pixel(-1, 5),
                    // nose
                    new Pixel(-2, 5),
                    // rest
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-3, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                    new Pixel(-1, 4),
                ],
                [DirectionEnum.RIGHT]: [
                    // lips
                    new Pixel(-1, 5),
                    // nose
                    new Pixel(-2, 5),
                    // rest
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-3, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                    new Pixel(-1, 4),
                ],
                [DirectionEnum.LEFT]: [
                    // lips
                    new Pixel(-1, 5),
                    // nose
                    new Pixel(-2, 5),
                    // rest
                    new Pixel(-2, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-3, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                    new Pixel(-1, 4),
                ],
            },
        },
    },

    body: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    new Pixel(-1, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-1, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-1, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-4, 0),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.DOWN]: [
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-4, 0),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                ],
                [DirectionEnum.UP]: [
                    new Pixel(-4, 0),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, -1),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-2, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-2, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
                [DirectionEnum.RIGHT]: [
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
                [DirectionEnum.LEFT]: [
                    new Pixel(-2, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
            },
        },
    },

    tail: {
        [DirectionEnum.RIGHT]: {
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                    new Pixel(3, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.RIGHT]: [
                    new Pixel(0, -1),
                    new Pixel(1, -1),
                    new Pixel(2, -1),
                    new Pixel(3, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                    new Pixel(2, 0),
                ],
            },
        },
        [DirectionEnum.UP]: {
            [DirectionEnum.UP]: {
                [DirectionEnum.UP]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(-1, 1),
                    new Pixel(-1, 2),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.UP]: [
                    new Pixel(-1, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(-1, 1),
                    new Pixel(-1, 2),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.UP]: [
                    new Pixel(-2, -3),
                    new Pixel(-2, -2),
                    new Pixel(-1, -2),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(-1, 1),
                    new Pixel(-1, 2),
                ],
            },
        },
        [DirectionEnum.LEFT]: {
            [DirectionEnum.LEFT]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                ],
            },
            [DirectionEnum.DOWN]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-4, -1),
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                ],
            },
            [DirectionEnum.UP]: {
                [DirectionEnum.LEFT]: [
                    new Pixel(-3, -1),
                    new Pixel(-2, -1),
                    new Pixel(-1, -1),
                    new Pixel(-4, 0),
                    new Pixel(-3, 0),
                    new Pixel(-2, 0),
                    new Pixel(-1, 0),
                    new Pixel(0, 0),
                    new Pixel(1, 0),
                ],
            },
        },
        [DirectionEnum.DOWN]: {
            [DirectionEnum.DOWN]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                    new Pixel(-2, 1),
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.RIGHT]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                    new Pixel(-2, 1),
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-2, 4),
                ],
            },
            [DirectionEnum.LEFT]: {
                [DirectionEnum.DOWN]: [
                    new Pixel(-1, -1),
                    new Pixel(-1, 0),
                    new Pixel(-2, 1),
                    new Pixel(-1, 1),
                    new Pixel(-2, 2),
                    new Pixel(-1, 2),
                    new Pixel(-2, 3),
                    new Pixel(-1, 3),
                    new Pixel(-1, 4),
                ],
            },
        },
    },
};
