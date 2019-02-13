import {BugTypesEnum} from '../enums/bug-types.enum';
import {Eatable} from './eatable.model';
import {bugData} from '../data/bug.data';
import {Pixel} from '../../../common/model/pixel.model';
import {DrawableInterface} from '../../../common/interfaces/drawable.interface';
import {Config} from '../../../../config';
import {Position} from '../../../common/model/position.model';

export class Bug extends Eatable implements DrawableInterface {
    public static readonly width: number = Config.MOVE * 2;
    public static readonly height: number = Config.MOVE;

    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum, value: number = null) {
        super(x, y);
        this.type = type;
        this.value = value !== null ? value : Math.round(Math.random() * 30) + 15;
    }

    public getPixels(options?: {
         offset: Position,
     }): Pixel[] {
        const start = options && options.offset ? options.offset : new Position(this.x, this.y);
        const bugPixels = bugData[this.type];
        if (!bugPixels) {
            return [];
        }
        return bugPixels.map((pixel: Pixel) => new Pixel(
            start.x + pixel.x,
            start.y + pixel.y,
        ));
    }

    protected getWidth(): number {
        return Bug.width;
    }

    protected getHeight(): number {
        return Bug.height;
    }
}
