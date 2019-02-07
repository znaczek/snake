import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {TextWriter} from './common/text-writer';
import {AppEvent} from './common/model/game-event.model';
import {Intro} from './modules/intro/intro';
import {Menu} from './modules/menu/menu';
import {filter, map, startWith, debounceTime} from 'rxjs/operators';
import {ClicksEnum} from './common/enums/clicks.enum';
import {MenuItemFactory} from './modules/menu/factory/menu-item.factory';
import {DrawingUtils} from './modules/menu/utils/drawing.utils';
import {Blackboard} from './common/blackboard';
import {WindowParams} from './common/model/window-params.model';
import {Config} from '../Config';
import {DrawingConfigInterface} from './common/interfaces/drawing-config.interface';
import {GameStageInterface} from './common/interfaces/game-stage.interface';

export class App {
    private canvas: Canvas;
    private intro: Intro;
    private menu: Menu;
    private game: Game;
    private config: Config;
    private mealFactory: MealFactory;
    private textWriter: TextWriter;
    private onClick$: Observable<ClicksEnum>;
    private stageHandler$: Subject<AppEvent>;
    private menuItemFactory: MenuItemFactory;
    private drawingUtils: DrawingUtils;
    private board: Blackboard;
    private currentStage: GameStageInterface;

    constructor(canvas: HTMLCanvasElement, keyboard: HTMLElement) {
        this.onClick$ = merge(
            fromEvent(document, 'keydown').pipe(
                map((event: KeyboardEvent) => {
                    return <ClicksEnum>event.keyCode;
                }),
                filter((event) =>  event in ClicksEnum),
            ),
            fromEvent(keyboard, 'click').pipe(
                map((event: MouseEvent) => {
                    const code = (<HTMLElement>(event.target)).dataset.code ||
                        (<HTMLElement>(event.target)).parentElement.dataset.code;
                    return <ClicksEnum>parseInt(code, 10);
                }),
                filter((event) =>  event in ClicksEnum),
            ),
        );

        this.config = new Config(fromEvent(window, 'resize').pipe(
            debounceTime(500),
            map((event: Event ) => {
                const eventTarget = <Window>event.target;
                return new WindowParams(eventTarget.innerWidth, eventTarget.innerHeight);
            }),
            startWith(new WindowParams(window.innerWidth, window.innerHeight)),
        ));
        this.config.drawingConfig$.subscribe((config: DrawingConfigInterface) => {
           keyboard.style.width = config.widthPx + 'px';
        });
        this.stageHandler$ = new Subject<AppEvent>();
        this.mealFactory = new MealFactory();
        this.canvas = new Canvas(canvas, this.config);
        this.textWriter = new TextWriter();
        this.menuItemFactory = new MenuItemFactory(this.textWriter);
        this.drawingUtils = new DrawingUtils(this.textWriter);
    }

    public run() {
        this.stageHandler$.subscribe((event) => {
            if (this.currentStage) {
                this.currentStage.close();
            }
            this.canvas.clear();
            let startData = null;
            switch (event.type) {
                case AppEvent.START_MENU: {
                    this.currentStage = this.createMenu();
                    break;
                }
                case AppEvent.START_GAME: {
                    this.currentStage = this.createGame();
                    startData = event.payload.resumed;
                    break;
                }
                case AppEvent.END_GAME: {
                    this.currentStage = this.createMenu();
                    break;
                }
            }
            this.currentStage.start(startData);
        });

        this.stageHandler$.next(AppEvent.startMenu());
    }

    private createIntro(): Intro {
        return new Intro(
            this.stageHandler$,
            this.canvas,
        );
    }

    private createMenu(): Menu {
        return new Menu(
            this.config,
            this.stageHandler$,
            this.canvas,
            this.onClick$,
            this.textWriter,
            this.menuItemFactory,
            this.drawingUtils,
        );
    }

    private createGame(): Game {
        return new Game(
            this.config,
            this.stageHandler$,
            this.canvas,
            this.onClick$,
            this.textWriter,
            this.mealFactory,
        );
    }

    /**
     * For debugging purpose
     */
    private createBlackBoard() {
        this.board = new Blackboard(this.canvas, this.config);
    }

}
