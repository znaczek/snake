import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, Observable} from 'rxjs';
import {TextWriter} from './common/text-writer';

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
