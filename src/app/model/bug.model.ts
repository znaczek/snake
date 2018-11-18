import {BugTypesEnum} from '../enums/bug-types.enum';
import {Position} from './position.model';

export class Bug extends Position {
    public value: number;

    constructor(public x: number, public y: number, public type: BugTypesEnum) {
        super(x, y);
        this.type = type;
        this.value = Math.round(Math.random() * 40) + 10;
    }
}
