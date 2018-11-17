import {Game} from './game';
import {Canvas} from './canvas';
import {AppleFactory} from './factory/apple.factory';

export class App {
    private canvas: Canvas;
    private game: Game;
    private appleFactory: AppleFactory;

    public init(canvas: HTMLCanvasElement) {
        this.appleFactory = new AppleFactory();
        this.canvas = new Canvas(canvas);
        this.canvas.init();
        this.game = new Game(this.canvas, this.appleFactory);
        this.game.init();
    }
}
