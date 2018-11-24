import {Canvas} from '../../common/canvas';
import {Pixel} from '../../common/model/pixel.model';
import {Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';

export class Intro {
    constructor (private stageHandler: Subject<AppEvent>, private canvas: Canvas) {
    }

    public start(): Intro {
        this.canvas.prepareBoard();
        const pixels: Pixel[] = [
            new Pixel(10, 10),
            new Pixel(9, 10),
            new Pixel(8, 10),
            new Pixel(8, 11),
            new Pixel(8, 12),
            new Pixel(9, 12),
            new Pixel(10, 12),
            new Pixel(10, 13),
            new Pixel(10, 14),
            new Pixel(9, 14),
            new Pixel(8, 14),
        ];

        this.canvas.drawPixels(pixels);
        setTimeout(() => {
            this.stageHandler.next(AppEvent.startMenu());
        }, 3000);

        return this;
    }
}
