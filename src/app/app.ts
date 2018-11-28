import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, Observable, Subject} from 'rxjs';
import {TextWriter} from './common/text-writer';
import {AppEvent} from './common/model/game-event.model';
import {Intro} from './modules/intro/intro';
import {Menu} from './modules/menu/menu';
import {map} from 'rxjs/internal/operators';
import {ClicksEnum} from './common/enums/clicks.enum';
import {MenuItemFactory} from './modules/menu/factory/menu-item.factory';
import {AppState} from './common/app-state';
import {DrawingUtils} from './modules/menu/utils/drawing.utils';
import {Blackboard} from './common/blackboard';

export class App {
    private canvas: Canvas;
    private intro: Intro;
    private menu: Menu;
    private game: Game;
    private mealFactory: MealFactory;
    private textWriter: TextWriter;
    private onClick: Observable<ClicksEnum>;
    private stageHandler: Subject<AppEvent>;
    private menuItemFactory: MenuItemFactory;
    private drawingUtils: DrawingUtils;

    constructor(canvas: HTMLCanvasElement) {
        this.onClick = fromEvent(document, 'keydown').pipe(
            map((event: KeyboardEvent) => {
                switch (event.keyCode) {
                    case 37:
                        return ClicksEnum.LEFT;
                    case 39:
                        return ClicksEnum.RIGHT;
                    case 38:
                        return ClicksEnum.UP;
                    case 40:
                        return ClicksEnum.DOWN;
                    case 13:
                        return ClicksEnum.ENTER;
                 }
            }),
        );
        this.stageHandler = new Subject<AppEvent>();
        this.mealFactory = new MealFactory();
        this.canvas = new Canvas(canvas);
        this.textWriter = new TextWriter();
        this.menuItemFactory = new MenuItemFactory(this.textWriter);
        this.drawingUtils = new DrawingUtils(this.textWriter);
    }

    public run() {
        this.stageHandler.subscribe((event) => {
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
                    this.createMenu();
                    break;
                }
            }
        });
        // this.createMenu();
        this.createBlackBoard();
    }

    private createIntro() {
        this.intro = new Intro(this.stageHandler, this.canvas).start();
    }

    private createMenu() {
        this.menu = new Menu(this.stageHandler, this.canvas, this.onClick, this.textWriter, this.menuItemFactory, this.drawingUtils).start();
    }

    private createGame() {
        this.game = new Game(this.stageHandler, this.canvas, this.onClick, this.textWriter, this.mealFactory).start();
    }
    private createBlackBoard() {
        new Blackboard(this.canvas);
    }

}
