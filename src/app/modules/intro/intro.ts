import {Canvas} from '../../common/canvas';
import {Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';
import {stageData} from './data/stage.data';

export class Intro {
    constructor (private stageHandler: Subject<AppEvent>, private canvas: Canvas) {
    }

    public start(): Intro {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(stageData);
        setTimeout(() => {
            this.stageHandler.next(AppEvent.startMenu());
        }, 2500);

        return this;
    }
}
