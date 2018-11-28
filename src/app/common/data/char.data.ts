import {Char} from '../model/char.model';
import {Pixel} from '../model/pixel.model';
import {CharDataInterface} from '../../modules/game/interface/char-data.interface';

export const charData: CharDataInterface = {
    '-': new Char(4, [
        new Pixel(0, 2),
        new Pixel(1, 2),
        new Pixel(2, 2),
    ]),
    '0': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 4),
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
    'S': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    'N': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 1),
        new Pixel(2, 2),
        new Pixel(3, 0), new Pixel(3, 1), new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4),
    ]),
    'A': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2),
        new Pixel(2, 0), new Pixel(2, 2),
        new Pixel(3, 0), new Pixel(3, 1), new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4),
    ]),
    'K': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 2),
        new Pixel(2, 1), new Pixel(2, 3),
        new Pixel(3, 0), new Pixel(3, 4),
    ]),
    'E': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 2), new Pixel(2, 4),
    ]),
    'I': new Char(2, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
    ]),
    ':': new Char(2, [
        new Pixel(0, 1), new Pixel(0, 3),
    ]),
    'W': new Char(6, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 3),
        new Pixel(2, 2),
        new Pixel(3, 3),
        new Pixel(4, 0), new Pixel(4, 1), new Pixel(4, 2), new Pixel(4, 3), new Pixel(4, 4),
    ]),
    'G': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 2), new Pixel(2, 4),
        new Pixel(3, 0), new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4),
    ]),
    'M': new Char(6, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 1),
        new Pixel(2, 2),
        new Pixel(3, 1),
        new Pixel(4, 0), new Pixel(4, 1), new Pixel(4, 2), new Pixel(4, 3), new Pixel(4, 4),
    ]),
    'L': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 4),
        new Pixel(2, 4),
    ]),
    'V': new Char(6, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2),
        new Pixel(1, 2), new Pixel(1, 3),
        new Pixel(2, 4),
        new Pixel(3, 2), new Pixel(3, 3),
        new Pixel(4, 0), new Pixel(4, 1), new Pixel(4, 2),
    ]),
    'Z': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(0, 3), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(1, 2), new Pixel(2, 4),
        new Pixel(3, 0), new Pixel(2, 1), new Pixel(3, 4),
    ]),
    'H': new Char(5, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 2),
        new Pixel(2, 2),
        new Pixel(3, 0), new Pixel(3, 1), new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4),
    ]),
    'C': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 4),
    ]),
    'O': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),
    'R': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 0), new Pixel(1, 2), new Pixel(1, 3),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 4),
    ]),
    'U': new Char(4, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 4),
        new Pixel(2, 0), new Pixel(2, 1), new Pixel(2, 2), new Pixel(2, 3), new Pixel(2, 4),
    ]),

};
