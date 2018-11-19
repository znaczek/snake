import {Position} from './position.model';
import {Pixel} from './pixel.model';

export class Rectangle {
    constructor (
        public begin: Position,
        public end: Position,
    ) {
    }

    public getPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        for (let x = this.begin.x; x <= this.end.x; x += 1) {
            for (let y = this.begin.y; y <= this.end.y; y += 1) {
                pixels.push(new Pixel(x, y));
            }
        }
        return pixels;
    }

}
