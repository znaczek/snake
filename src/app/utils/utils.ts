import {Rectangle} from '../model/rectangle.model';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export const clone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

export const isOverlapping = (figure1: Rectangle, figure2: Rectangle) => {
    return !(
        figure1.begin.x >= figure2.end.x ||
        figure2.begin.x >= figure1.end.x ||
        figure1.begin.y >= figure2.end.y ||
        figure2.begin.y >= figure1.end.y
    );
};

export const getRectangleFromPixels = (pixels: Pixel[]) => {
    let minX = 1000;
    let maxX = 0;
    let minY = 1000;
    let maxY = 0;
    pixels.forEach((elem: Pixel) => {
        const x = elem.x;
        const y = elem.y;
        if (x < minX) {
            minX = x;
        }
        if (x > maxX) {
            maxX = x;
        }
        if (y < minY) {
            minY = y;
        }
        if (y > maxY) {
            maxY = y;
        }
    });

    return new Rectangle(
        new Position(minX, minY),
        new Position(maxX, maxY),
    );
};
