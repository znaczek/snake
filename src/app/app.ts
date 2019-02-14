import {Game} from './modules/game/views/game.view';
import {fromEvent, merge, Subject} from 'rxjs';
import {StageEvent} from './common/model/StageEvents';
import {ClicksEnum} from './common/enums/clicks.enum';
import {Blackboard} from './common/views/blackboard';
import {Config} from '../config';
import {AbstractView} from './common/views/abstract.view';
import 'reflect-metadata';
import {Injector} from './common/di/injector';
import {StageHandler} from './common/services/stage-handler';
import {debounceTime, filter, map, startWith} from 'rxjs/internal/operators';
import {WindowParamsModel} from './common/model/window-params.model';
import {DrawingConfigInterface} from './common/interfaces/drawing-config.interface';
import {ClickHandler} from './common/services/click-handler';
import {AppState} from './common/app-state';
import {Intro} from './modules/intro/intro';

export class App {
    private canvasElement: HTMLCanvasElement;
    private keyboardElement: HTMLElement;
    private currentStage: AbstractView;
    private injector: Injector;

    constructor(canvas: HTMLCanvasElement, keyboard: HTMLElement) {
        this.keyboardElement = keyboard;
        this.canvasElement = canvas;
        this.injector = new Injector();
    }

    public run() {
        const clickHandler = new ClickHandler();
        clickHandler.onClick$ = merge(
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

        const stageHandler = new StageHandler();
        this.injector.provide(StageHandler, stageHandler);
        this.injector.provide(HTMLCanvasElement, this.canvasElement);
        this.injector.provide(ClickHandler, clickHandler);
        this.injector.provide(Config, config);

        AppState.validateState();

        stageHandler.subject.subscribe((event) => {
            if (this.currentStage) {
                this.currentStage.close();
            }

            this.currentStage = this.injector.resolve(event.view);
            this.currentStage.start(event.startData);
        });

        window.addEventListener('beforeunload', () => {
            if (this.currentStage instanceof Game) {
                this.currentStage.pauseGame();
            }
        });

        if (!Config.BLACKBOARD) {
            stageHandler.next(new StageEvent(Intro));
        } else {
            this.createBlackBoard();
        }
    }

    /**
     * For debugging purpose
     */
    private createBlackBoard() {
        this.currentStage = this.injector.resolve(Blackboard);
        this.currentStage.start();
    }

}
