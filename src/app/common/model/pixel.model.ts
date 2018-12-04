import {Position} from './position.model';
import {ColorsEnum} from '../enums/color.enums';

export class Pixel extends Position {
    public color: ColorsEnum;
    constructor(public x: number, public y: number, color?: ColorsEnum) {
        super(x, y);
        this.color = color;
    }
}
