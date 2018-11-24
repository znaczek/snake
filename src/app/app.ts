import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, Observable, Subject} from 'rxjs';
import {TextWriter} from './common/text-writer';
import {AppEvent} from './common/model/game-event.model';
import {Intro} from './modules/intro/intro';
import {Menu} from './modules/menu/menu';

export class App {
    private canvas: Canvas;
    private intro: Intro;
    private menu: Menu;
    private game: Game;
    private mealFactory: MealFactory;
    private textWriter: TextWriter;
    private onClick: Observable<Event>;
    private stageHandler: Subject<AppEvent>;

    constructor(canvas: HTMLCanvasElement) {
        this.onClick = fromEvent(document, 'keydown');
        this.stageHandler = new Subject<AppEvent>();
        this.mealFactory = new MealFactory();
        this.canvas = new Canvas(canvas);
        this.textWriter = new TextWriter();
    }

    public run() {
        this.stageHandler.subscribe((event: AppEvent) => {
            this.canvas.clear();
            switch (event.type) {
                case AppEvent.START_MENU: {
                    this.createMenu();
                    break;
                }
                case AppEvent.START_GAME: {
                    this.createGame();
                    break;
                }
                case AppEvent.END_GAME: {
                    // TODO
                    this.createMenu();
                    break;
                }
            }
        });
        this.createIntro();
    }

    private createIntro() {
        this.intro = new Intro(this.stageHandler, this.canvas).start();
    }

    private createMenu() {
        this.menu = new Menu(this.stageHandler, this.canvas, this.onClick).start();
    }

    private createGame() {
        this.game = new Game(this.stageHandler, this.canvas, this.onClick, this.textWriter, this.mealFactory).start();
    }

}
