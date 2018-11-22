import {Char} from '../model/char.model';
import {Pixel} from '../model/pixel.model';
import {CharDataInterface} from '../interfaces/char-data.interface';

export const charData: CharDataInterface = {
    //  Numbers
    '0': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0),new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '1': new Char(4, [
        new Pixel(0, 1),
        new Pixel(1, 0), new Pixel(1, 1), new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4),
    ]),
    '2': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 4),
    ]),
    '3': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 2), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '4': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2),
        new Pixel(1, 2),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '5': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '6': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '7': new Char(4, [
        new Pixel(0, 0),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1),
    ]),
    '8': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    '9': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
};
