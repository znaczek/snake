import {Rectangle} from '../model/rectangle.model';
import {getRectangleFromPixels} from '../utils/utils';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export abstract class Eatable extends Position {
    constructor(public x: number, public y: number) {
        super(x, y);
    }

    public getBoundary(): Rectangle {
        const pixels: Pixel[] = [];
        for (let x = 0; x < this.getWidth(); x += 1) {
            for (let y = 0; y < this.getHeight(); y += 1) {
                pixels.push(new Pixel(this.x + x, this.y + y));
            }
        }
        return getRectangleFromPixels(pixels);
    }

    protected abstract getWidth(): number;
    protected abstract getHeight(): number;

}
