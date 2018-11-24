import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export interface DrawableInterface {
    getPixels: (options?: {
        offset?: Position,
        additionalPixelsSets?: Pixel[][],
    }) => Pixel[];
}
