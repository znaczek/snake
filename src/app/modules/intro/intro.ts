import {Canvas} from '../../common/canvas';
import {StageEvent} from '../../common/model/StageEvents';
import {stageData} from './data/stage.data';
import {Pixel} from '../../common/model/pixel.model';
import {ViewInterface} from '../../common/interfaces/view.interface';
import {StageHandler} from '../../common/observables/stage-handler';
import {Injectable} from '../../common/di/injectable';
import {MainMenu} from '../menu/views/main-menu.view';

@Injectable
export class Intro implements ViewInterface {
    constructor (private stageHandler$: StageHandler<StageEvent>, private canvas: Canvas) {
    }

    public start(): void {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(stageData.map((item) => new Pixel(item.x, item.y)));
        setTimeout(() => {
            this.stageHandler$.next(new StageEvent(MainMenu));
        }, 2500);
    }

    public close(): void {}
}
