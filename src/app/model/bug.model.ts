import {BugTypesEnum} from '../enums/bug-types.enum';
import {Eatable} from '../interfaces/eatable';
import {bugData} from '../data/bug.data';
import {Pixel} from './pixel.model';
import {DrawableInterface} from '../interfaces/drawable.interface';
import {Position} from './position.model';

export class Bug extends Eatable implements DrawableInterface {
    public static readonly width = 8;
    public static readonly height = 4;

    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum) {
        super(x, y);
        this.type = type;
        this.value = Math.round(Math.random() * 20) + 10;
    }

    public getPixels(): Pixel[] {
        return this.getPixelsRelative(new Position(this.x, this.y));
    }

    public getPixelsRelative(position: Position): Pixel[] {
        const bugPixels = bugData[this.type];
        if (!bugPixels) {
            return [];
        }
        return bugPixels.map((pixel: Pixel) => new Pixel(
            position.x + pixel.x,
            position.y + pixel.y,
        ));
    }

    protected getWidth(): number {
        return Bug.width;
    }

    protected getHeight(): number {
        return Bug.height;
    }
}
