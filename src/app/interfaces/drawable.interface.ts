import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export interface DrawableInterface {
    getPixels: (start?: Position) => Pixel[];
}
