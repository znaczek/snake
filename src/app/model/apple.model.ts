import {Eatable} from '../interfaces/eatable';
import {DrawableInterface} from '../interfaces/drawable.interface';
import {Pixel} from './pixel.model';

export class Apple extends Eatable implements DrawableInterface {
    public static readonly width = 4;
    public static readonly height = 4;

    constructor(public x: number, public y: number) {
        super(x, y);
    }

    public getPixels(): Pixel[] {
        return [
            new Pixel(this.x + 1, this.y + 0),
            new Pixel(this.x + 0, this.y + 1),
            new Pixel(this.x + 2, this.y + 1),
            new Pixel(this.x + 1, this.y + 2),
        ];
    }

    protected getWidth(): number {
        return Apple.width;
    }

    protected getHeight(): number {
        return Apple.height;
    }

}
