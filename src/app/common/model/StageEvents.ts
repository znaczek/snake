import {ConstructorInterface} from '../interfaces/constructor.interface';

export class StageEvent<T = undefined> {

    constructor(public view: ConstructorInterface,
                public startData?: T) {
    }
}
