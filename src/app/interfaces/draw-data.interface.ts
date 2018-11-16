import {Pixel} from '../model/pixel.model';

export interface DrawDataInterface {
    head: {
        [index: number]: {
            [index: number]: {
                [index: number]: Pixel[],
            },
        },
    };
    body: {
        [index: number]: {
            [index: number]: {
                [index: number]: Pixel[],
            },
        },
    };
    tail: {
        [index: number]: {
            [index: number]: {
                [index: number]: Pixel[],
            },
        },
    };
}
