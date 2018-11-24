import {Observable, Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';
import {Canvas} from '../../common/canvas';
import {MenuItem} from './model/menu-item.model';
import {TextWriter} from '../../common/text-writer';
import {menuCharData} from '../../common/data/menu-text.data';
import {Pixel} from '../../common/model/pixel.model';
import {Position} from '../../common/model/position.model';

export class Menu {
    private cursor: number;
    private offset: number;
    private menuItems: MenuItem[] = [];

    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<Event>,
                private textWriter: TextWriter) {
        this.textWriter.setCharData(menuCharData);
    }

    public start(): Menu {
        this.canvas.prepareBoard();
        this.createMenuItems();
        const onClickSubscription = this.onClick.subscribe(() => {
            onClickSubscription.unsubscribe();
            // this.stageHandler.next(AppEvent.startGame());
        });

        this.draw();
        return this;
    }

    private createMenuItems(): void {
        this.menuItems.push(
            new MenuItem(this.textWriter.write('New game'), 1),
            new MenuItem(this.textWriter.write('Level'), 2),
        );
    }

    private draw() {
        const outputPixels: Pixel[] = [];
        this.menuItems.forEach((item: MenuItem, index: number) => {
            outputPixels.push(...item.text.getPixels({
                offset: new Position(0, index * 10),
            }));
        });

        this.canvas.drawPixels(outputPixels);
    }

}
