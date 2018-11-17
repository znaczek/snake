import {Game} from './game';
import {Canvas} from './canvas';
import {AppleFactory} from './factory/apple.factory';
import {fromEvent, Observable} from 'rxjs';

export class App {
    private canvas: Canvas;
    private game: Game;
    private appleFactory: AppleFactory;
    private onClick: Observable<Event>;

    public init(canvas: HTMLCanvasElement) {
        this.appleFactory = new AppleFactory();
        this.onClick = fromEvent(document, 'keydown');
        this.canvas = new Canvas(canvas);
        this.canvas.init();
        this.game = new Game(this.canvas, this.appleFactory, this.onClick);
        this.game.init();
    }
}
