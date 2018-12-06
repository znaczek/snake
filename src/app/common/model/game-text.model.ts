import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';
import {Position} from './position.model';
import {ColorsEnum} from '../enums/color.enums';

export class AppText implements DrawableInterface {
    constructor(private pixels: Position[], private _length: number, private _text: string) {
    }

    public getPixels(options?: {
        offset?: Position,
        color?: ColorsEnum,
    }): Pixel[] {
        options = options || {};
        const offset = options.offset || new Position(0, 0);
        const color = options.color in ColorsEnum ? options.color : ColorsEnum.BLACK;
        return this.pixels.map((pixel: Pixel) => new Pixel(
            offset.x + pixel.x,
            offset.y + pixel.y,
            color,
        ));
    }

    get length(): number {
        return this._length;
    }

    get text(): string {
        return this._text;
    }
}
