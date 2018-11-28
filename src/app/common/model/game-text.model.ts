import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';
import {Position} from './position.model';
import {getRectangleFromPixels} from '../utils/utils';
import {Rectangle} from './rectangle.model';

export class AppText implements DrawableInterface {
    constructor(private pixels: Pixel[], private _length: number, private _text: string) {
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

    get length(): number {
        return this._length;
    }

    get text(): string {
        return this._text;
    }
}
