import {Eatable} from '../interfaces/eatable';

export class Apple extends Eatable {
    public static readonly width = 4;
    public static readonly height = 4;

    constructor(public x: number, public y: number) {
        super(x, y);
    }

    protected getWidth(): number {
        return Apple.width;
    }

    protected getHeight(): number {
        return Apple.height;
    }

}
