import {Rectangle} from '../../../common/model/rectangle.model';
import {Position} from '../../../common/model/position.model';
import {Utils} from '../../../common/utils/utils';

export abstract class Eatable extends Position {
    constructor(public x: number, public y: number) {
        super(x, y);
    }

    public getBoundary(): Rectangle {
        const positions: Position[] = [];
        for (let x = 0; x < this.getWidth(); x += 1) {
            for (let y = 0; y < this.getHeight(); y += 1) {
                positions.push(new Position(this.x + x, this.y + y));
            }
        }
        return Utils.getRectangleFromPixels(positions);
    }

    protected abstract getWidth(): number;
    protected abstract getHeight(): number;

}
