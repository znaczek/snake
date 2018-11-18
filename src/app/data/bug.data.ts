import {Pixel} from '../model/pixel.model';
import {BugDataInterface} from '../interfaces/bug-data.interface';
import {BugTypesEnum} from '../enums/bug-types.enum';

export const bugData: BugDataInterface = {
    [BugTypesEnum.WHALE]: [
        new Pixel(0, 1), new Pixel(0, 2),
        new Pixel(1, 3),
        new Pixel(2, 2), new Pixel(2, 3),
        new Pixel(3, 1), new Pixel(3, 2), new Pixel(3, 3),
        new Pixel(4, 0), new Pixel(4, 1), new Pixel(4, 2), new Pixel(4, 3),
        new Pixel(5, 0), new Pixel(5, 2), new Pixel(5, 3),
        new Pixel(6, 1), new Pixel(6, 2), new Pixel(6, 3),
        new Pixel(7, 3),
    ],
};
