import {Rectangle} from '../model/rectangle.model';
import {Pixel} from '../model/pixel.model';
import {Position} from '../model/position.model';

export class Utils {

    public static clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    public static isOverlapping(figure1: Rectangle, figure2: Rectangle): boolean{
        return !(
            figure1.begin.x >= figure2.end.x ||
            figure2.begin.x >= figure1.end.x ||
            figure1.begin.y >= figure2.end.y ||
            figure2.begin.y >= figure1.end.y
        );
    }

    public static getRectangleFromPixels(positions: Position[]): Rectangle {
        let minX = 1000;
        let maxX = 0;
        let minY = 1000;
        let maxY = 0;
        positions.forEach((elem: Pixel) => {
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
    }

    public static isInt(value: any): boolean {
        if (isNaN(value)) {
            return false;
        }
        const x = parseFloat(value);
        return (x | 0) === x;
    }
}
