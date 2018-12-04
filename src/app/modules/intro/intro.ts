import {Canvas} from '../../common/canvas';
import {Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';
import {stageData} from './data/stage.data';
import {Pixel} from '../../common/model/pixel.model';

export class Intro {
    constructor (private stageHandler: Subject<AppEvent>, private canvas: Canvas) {
    }

    public start(): Intro {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(stageData.map((item) => new Pixel(item.x, item.y)));
        setTimeout(() => {
            this.stageHandler.next(AppEvent.startMenu());
        }, 2500);

        return this;
    }
}
