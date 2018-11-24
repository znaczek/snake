import {BugTypesEnum} from '../enums/bug-types.enum';
import {Eatable} from './eatable.model';
import {bugData} from '../data/bug.data';
import {Pixel} from '../../../common/model/pixel.model';
import {DrawableInterface} from '../../../common/interfaces/drawable.interface';
import * as config from '../../../../config';
import {Position} from '../../../common/model/position.model';

export class Bug extends Eatable implements DrawableInterface {
    public static readonly width: number = config.MOVE * 2;
    public static readonly height: number = config.MOVE;

    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum) {
        super(x, y);
        this.type = type;
        this.value = Math.round(Math.random() * 20) + 10;
    }

    public getPixels(options?: {
         offset: Position,
     }): Pixel[] {
        options = options || {
            offset: new Position(0, 0),
        };
        const bugPixels = bugData[this.type];
        if (!bugPixels) {
            return [];
        }
        return bugPixels.map((pixel: Pixel) => new Pixel(
            this.x + options.offset.x + pixel.x,
            this.y + options.offset.y + pixel.y,
        ));
    }

    protected getWidth(): number {
        return Bug.width;
    }

    protected getHeight(): number {
        return Bug.height;
    }
}
