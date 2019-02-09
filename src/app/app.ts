import {Game} from './modules/game/game';
import {Canvas} from './common/canvas';
import {MealFactory} from './modules/game/factory/meal.factory';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {TextWriter} from './common/text-writer';
import {AppEvent, AppEventTypes, StartGameEvent, StartIntroEvent, StartMenuEvent} from './common/model/AppEvents';
import {Intro} from './modules/intro/intro';
import {Menu} from './modules/menu/menu';
import {ClicksEnum} from './common/enums/clicks.enum';
import {MenuItemFactory} from './modules/menu/factory/menu-item.factory';
import {DrawingUtils} from './modules/menu/utils/drawing.utils';
import {Blackboard} from './common/blackboard';
import {Config} from '../Config';
import {GameStageInterface} from './common/interfaces/game-stage.interface';
import 'reflect-metadata';
import {Injector} from './common/di/injector';
import {StageHandler} from './common/observables/stage-handler';
import {debounceTime, filter, map, startWith} from 'rxjs/internal/operators';
import {WindowParamsModel} from './common/model/window-params.model';
import {DrawingConfigInterface} from './common/interfaces/drawing-config.interface';
import {ClickObservable} from './common/observables/click-observable';
import {AppState} from './common/app-state';

export class App {
    private canvasElement: HTMLCanvasElement;
    private keyboardElement: HTMLElement;
    private currentStage: GameStageInterface;
    private injector: Injector;

    constructor(canvas: HTMLCanvasElement, keyboard: HTMLElement) {
        this.keyboardElement = keyboard;
        this.canvasElement = canvas;
        this.injector = new Injector();
    }

    public run() {
        const onClick$ = merge(
            fromEvent(document, 'keydown').pipe(
                map((event: KeyboardEvent) => {
                    return <ClicksEnum>event.keyCode;
                }),
                filter((event) =>  event in ClicksEnum),
            ),
            fromEvent(this.keyboardElement, 'click').pipe(
                map((event: MouseEvent) => {
                    const code = (<HTMLElement>(event.target)).dataset.code ||
                        (<HTMLElement>(event.target)).parentElement.dataset.code;
                    return <ClicksEnum>parseInt(code, 10);
                }),
                filter((event) =>  event in ClicksEnum),
            ),
        );

        const config = new Config(fromEvent(window, 'resize').pipe(
            debounceTime(500),
            map((event: Event ) => {
                const eventTarget = <Window>event.target;
                return new WindowParamsModel(eventTarget.innerWidth, eventTarget.innerHeight);
            }),
            startWith(new WindowParamsModel(window.innerWidth, window.innerHeight)),
        ));
        config.drawingConfig$.subscribe((cfg: DrawingConfigInterface) => {
            this.keyboardElement.style.width = cfg.widthPx + 'px';
        });

        const stageHandler$ = new Subject<AppEvent>();
        this.injector.provide(StageHandler, stageHandler$);
        this.injector.provide(HTMLCanvasElement, this.canvasElement);
        this.injector.provide(ClickObservable, onClick$);
        this.injector.provide(Config, config);

        AppState.validateState();
        stageHandler$.subscribe((event) => {
            if (this.currentStage) {
                this.currentStage.close();
            }

            let startData = null;
            switch (event.type) {
                case AppEventTypes.START_INTRO: {
                    this.currentStage = this.injector.resolve(Intro);
                    break;
                }
                case AppEventTypes.START_MENU: {
                    this.currentStage = this.injector.resolve(Menu);
                    break;
                }
                case AppEventTypes.START_GAME: {
                    this.currentStage = this.injector.resolve(Game);
                    startData = (<StartGameEvent>event).payload.resumed;
                    break;
                }
                case AppEventTypes.END_GAME: {
                    this.currentStage = this.injector.resolve(Menu);
                    break;
                }
            }
            this.currentStage.start(startData);
        });

        window.addEventListener('beforeunload', () => {
            if (this.currentStage instanceof Game) {
                this.currentStage.pauseGame();
            }
        });

        // stageHandler$.next(new StartIntroEvent());
        stageHandler$.next(new StartMenuEvent());
    }

    /**
     * For debugging purpose
     */
    private createBlackBoard() {
        this.currentStage = this.injector.resolve(Blackboard);
        this.currentStage.start();
    }

}
