import {Game} from './game';
import {Canvas} from './canvas';

export class App {
    private canvas: Canvas;
    private game: Game;

    public init(canvas: HTMLCanvasElement) {
        this.canvas = new Canvas(canvas);
        this.canvas.init();
        this.game = new Game(this.canvas);
        this.game.init();
    }
}
