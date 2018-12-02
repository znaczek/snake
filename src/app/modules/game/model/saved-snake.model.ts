import {EatenMeal} from './eaten-meal.model';
import {BodyPart} from './body-part.model';
import {DirectionEnum} from '../../../common/enums/direction.enum';

export class SavedSnake {
    public body: BodyPart[];
    public length: number;
    public oldBody: BodyPart[];
    public eatenMeals: EatenMeal[];
    public direction: DirectionEnum;
    public lastDirection: DirectionEnum;

    constructor(data: {
        body: BodyPart[],
        length: number,
        oldBody: BodyPart[],
        eatenMeals: EatenMeal[]
        direction: DirectionEnum;
        lastDirection: DirectionEnum;
    }) {
        this.body = data.body;
        this.length = data.length;
        this.oldBody = data.oldBody;
        this.eatenMeals = data.eatenMeals;
        this.direction = data.direction;
        this.lastDirection = data.direction;
    }
}
