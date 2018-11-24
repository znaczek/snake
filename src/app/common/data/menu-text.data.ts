import {Char} from '../model/char.model';
import {Pixel} from '../model/pixel.model';
import {CharDataInterface} from '../../modules/game/interface/char-data.interface';

export const menuCharData: CharDataInterface = {
    N: new Char(7, [
        new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4), new Pixel(0, 5), new Pixel(0, 6),
        new Pixel(1, 1), new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 6),
        new Pixel(2, 2), new Pixel(2, 3),
        new Pixel(3, 3), new Pixel(3, 4),
        new Pixel(4, 0), new Pixel(4, 1), new Pixel(4, 2), new Pixel(4, 3), new Pixel(4, 4), new Pixel(4, 5),
        new Pixel(5, 0), new Pixel(5, 1), new Pixel(5, 2), new Pixel(5, 3), new Pixel(5, 4), new Pixel(5, 5), new Pixel(5, 6),
    ]),
    e: new Char(6, [
        new Pixel(0, 3), new Pixel(0, 4), new Pixel(0, 5),
        new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 6),
        new Pixel(2, 2), new Pixel(2, 4), new Pixel(2, 6),
        new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4), new Pixel(3, 6),
        new Pixel(4, 3), new Pixel(4, 4), new Pixel(4, 6),
    ]),
    w: new Char(8, [
        new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 6),
        new Pixel(2, 5), new Pixel(2, 6),
        new Pixel(3, 3), new Pixel(3, 4), new Pixel(3, 5),
        new Pixel(4, 5), new Pixel(4, 6),
        new Pixel(5, 2), new Pixel(5, 3), new Pixel(5, 4), new Pixel(5, 5), new Pixel(5, 6),
        new Pixel(6, 2), new Pixel(6, 3), new Pixel(6, 4),
    ]),
    g: new Char(6, [
        new Pixel(0, 3), new Pixel(0, 4),
        new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 7),
        new Pixel(2, 2), new Pixel(2, 5), new Pixel(2, 7),
        new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4), new Pixel(3, 5), new Pixel(3, 6), new Pixel(3, 7),
        new Pixel(4, 2), new Pixel(4, 3), new Pixel(4, 4), new Pixel(4, 5), new Pixel(4, 6),
    ]),
    m: new Char(9, [
        new Pixel(0, 2), new Pixel(0, 3), new Pixel(0, 4), new Pixel(0, 5), new Pixel(0, 6),
        new Pixel(1, 2), new Pixel(1, 3), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 6),
        new Pixel(2, 2),
        new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4), new Pixel(3, 5), new Pixel(3, 6),
        new Pixel(4, 2), new Pixel(4, 3), new Pixel(4, 4), new Pixel(4, 5), new Pixel(4, 6),
        new Pixel(5, 2),
        new Pixel(6, 2), new Pixel(6, 3), new Pixel(6, 4), new Pixel(6, 5), new Pixel(6, 6),
        new Pixel(7, 3), new Pixel(7, 4), new Pixel(7, 5), new Pixel(7, 6),
    ]),
    a: new Char(6, [
        new Pixel(0, 5),
        new Pixel(1, 2), new Pixel(1, 4), new Pixel(1, 5), new Pixel(1, 6),
        new Pixel(2, 2), new Pixel(2, 4), new Pixel(2, 6),
        new Pixel(3, 2), new Pixel(3, 3), new Pixel(3, 4), new Pixel(3, 5), new Pixel(3, 6),
        new Pixel(4, 3), new Pixel(4, 4), new Pixel(4, 5), new Pixel(4, 6),
    ]),

};
