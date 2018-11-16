import * as config from '../../config';
import {Apple} from '../model/apple.model';

export class AppleGenerator{
    generate(): Apple {
        return new Apple(
            this.getNumber(config.CANVAS_WIDTH),
            this.getNumber(config.CANVAS_HEIGHT),)
    }

    getNumber(max: number) {
        return Math.ceil((Math.random() * (max - 8)) / 4) * 4;
    }
}

