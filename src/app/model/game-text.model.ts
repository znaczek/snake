import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';
import {Position} from './position.model';

export class GameText implements DrawableInterface {
    constructor(private pixels: Pixel[], private begin: Position, private end: Position) {
    }

    public getPixels(options?: {
        start?: Position,
    }): Pixel[] {
        if (!options || !options.start) {
            return this.pixels;
        } else {
            return this.pixels.map((pixel: Pixel) => new Pixel(
               options.start.x + pixel.x,
               options.start.y + pixel.y,
            ));
        }
    }
}
