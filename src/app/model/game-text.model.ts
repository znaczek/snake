import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';
import {Position} from './position.model';

export class GameText implements DrawableInterface {
    constructor(private pixels: Pixel[], private begin: Position, private end: Position) {
    }

    public getPixels(start?: Position): Pixel[] {
        if (!start) {
            return this.pixels;
        } else {
            return this.pixels.map((pixel: Pixel) => new Pixel(
               start.x + pixel.x,
               start.y + pixel.y,
            ));
        }
    }
}
