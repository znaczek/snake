import {BugTypesEnum} from '../enums/bug-types.enum';
import {Eatable} from '../interfaces/eatable';

export class Bug extends Eatable {
    public static readonly width = 8;
    public static readonly height = 4;

    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum) {
        super(x, y);
        this.type = type;
        this.value = Math.round(Math.random() * 40) + 10;
    }

    protected getWidth(): number {
        return Bug.width;
    }

    protected getHeight(): number {
        return Bug.height;
    }
}
