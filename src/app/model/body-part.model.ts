import {DirectionEnum} from '../enums/direction.enum';
import {BodyPartEnum} from '../enums/body-part.enum';
import {Position} from './position.model';

export class BodyPart {
    constructor(public type: BodyPartEnum,
                public position: Position,
                public direction: DirectionEnum) {
    }

}
