import {DirectionEnum} from '../enums/direction.enum';
import {Position} from './position.model';

export class EatenMeal {
    public nextDirection: DirectionEnum;

    constructor(public position: Position,
                public previousDirection: DirectionEnum,
                public duration: number,
                public isNew = true) {
    }
}
