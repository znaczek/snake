import {Observable, Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';
import {Pixel} from '../../common/model/pixel.model';
import {Canvas} from '../../common/canvas';

export class Menu {
    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<Event>) {
    }

    public start(): Menu {
        this.canvas.prepareBoard();
        const pixels: Pixel[] = [
            new Pixel(45, 20),
            new Pixel(45, 19),
            new Pixel(45, 18),
            new Pixel(45, 17),
            new Pixel(46, 18),
            new Pixel(47, 19),
            new Pixel(48, 18),
            new Pixel(49, 17),
            new Pixel(49, 18),
            new Pixel(49, 19),
            new Pixel(49, 20),
        ];
        this.canvas.drawPixels(pixels);

        const onClickSubscription = this.onClick.subscribe(() => {
            onClickSubscription.unsubscribe();
            this.stageHandler.next(AppEvent.startGame());
        });

        return this;
    }

}
