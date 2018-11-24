import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';
import {Position} from './position.model';

export class GameText implements DrawableInterface {
    constructor(private pixels: Pixel[], private begin: Position, private end: Position) {
    }

    public getPixels(options?: {
        offset?: Position,
    }): Pixel[] {
        if (!options || !options.offset) {
            return this.pixels;
        } else {
            return this.pixels.map((pixel: Pixel) => new Pixel(
               options.offset.x + pixel.x,
               options.offset.y + pixel.y,
            ));
        }
    }
}
