import {BugTypesEnum} from '../enums/bug-types.enum';
import {Eatable} from '../interfaces/eatable';
import {bugData} from '../data/bug.data';
import {Pixel} from './pixel.model';

export class Bug extends Eatable {
    public static readonly width = 8;
    public static readonly height = 4;

    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum) {
        super(x, y);
        this.type = type;
        this.value = Math.round(Math.random() * 20) + 10;
    }

    public getPixels(): Pixel[] {
        const bugPixels = bugData[this.type];
        if (!bugPixels) {
            return [];
        }
        return bugPixels;
    }

    protected getWidth(): number {
        return Bug.width;
    }

    protected getHeight(): number {
        return Bug.height;
    }
}
