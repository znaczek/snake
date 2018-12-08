import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, Observable, Subject} from 'rxjs';
import {TextWriter} from './common/text-writer';
import {AppEvent} from './common/model/game-event.model';
import {Intro} from './modules/intro/intro';
import {Menu} from './modules/menu/menu';
import {map, filter} from 'rxjs/operators';
import {ClicksEnum} from './common/enums/clicks.enum';
import {MenuItemFactory} from './modules/menu/factory/menu-item.factory';
import {DrawingUtils} from './modules/menu/utils/drawing.utils';
import {Blackboard} from './common/blackboard';
import {WindowParamsInterface} from './common/interfaces/window-params.interface';
import {OrientationEnum} from './common/enums/orientation.enum';

export class App {
    private canvas: Canvas;
    private intro: Intro;
    private menu: Menu;
    private game: Game;
    private mealFactory: MealFactory;
    private textWriter: TextWriter;
    private onClick: Observable<ClicksEnum>;
    private windowParams: Observable<WindowParamsInterface>;
    private stageHandler: Subject<AppEvent>;
    private menuItemFactory: MenuItemFactory;
    private drawingUtils: DrawingUtils;
    private board: Blackboard;

    constructor(canvas: HTMLCanvasElement) {
        this.onClick = fromEvent(document, 'keydown').pipe(
            map((event: KeyboardEvent) => {
                return <ClicksEnum>event.keyCode;
            }),
            filter((event) =>  event in ClicksEnum),
        );

        this.windowParams = fromEvent(window, 'resize').pipe(
            map((event: Event ) => {
                const eventTarget = <Window>event.target;
                return {
                    width: eventTarget.innerWidth,
                    height: eventTarget.innerHeight,
                    orientation: eventTarget.innerHeight > eventTarget.innerWidth ?
                        OrientationEnum.VERTICAL : OrientationEnum.HORIONTAL,
                };
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
                    this.createGame(event.payload);
                    break;
                }
                case AppEvent.END_GAME: {
                    this.createMenu();
                    break;
                }
            }
        });
        // this.createIntro();
        // this.createGame({resumed: false});
        this.createMenu();
        // this.createBlackBoard();
    }

    private createIntro() {
        this.intro = new Intro(this.stageHandler, this.canvas).start();
    }

    private createMenu() {
        this.menu = new Menu(this.stageHandler, this.canvas, this.onClick, this.textWriter, this.menuItemFactory, this.drawingUtils).start();
    }

    private createGame(payload: {resumed: boolean}) {
        this.game = new Game(this.stageHandler, this.canvas, this.onClick, this.textWriter, this.mealFactory).start(payload.resumed);
    }
    private createBlackBoard() {
        this.board = new Blackboard(this.canvas);
    }

}
