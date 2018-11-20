import {Game} from './game';
import {Canvas} from './canvas';
import {MealFactory} from './factory/meal.factory';
import {fromEvent, Observable} from 'rxjs';
import {TextWriter} from './text-writer';

export class App {
    private canvas: Canvas;
    private game: Game;
    private mealFactory: MealFactory;
    private textWriter: TextWriter;
    private onClick: Observable<Event>;

    public init(canvas: HTMLCanvasElement) {
        this.onClick = fromEvent(document, 'keydown');
        this.mealFactory = new MealFactory();
        this.canvas = new Canvas(canvas);
        this.textWriter = new TextWriter();
        this.canvas.init();
        this.game = new Game(this.canvas, this.mealFactory, this.onClick, this.textWriter);
        this.game.init();
    }
}
