import {Injectable} from '../../../common/di/injectable';
import {Provide} from '../../../common/di/provide';
import {AbstractListMenuView} from './abstract-list-menu.view';
import {MenuListItemInterface} from '../interfaces/menu-list-item.interface';
import {StageEvent} from '../../../common/model/StageEvents';
import {MainMenu, MainMenuKeysEnum} from './main-menu.view';
import {AppState} from '../../../common/app-state';
import {ConstructorInterface} from '../../../common/interfaces/constructor.interface';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {Canvas} from '../../../common/canvas';
import {ClickObservable} from '../../../common/observables/click-observable';
import {Config} from '../../../../Config';
import {StageHandler} from '../../../common/observables/stage-handler';
import {DrawingService} from '../service/drawing.service';
import {TextWriter} from '../../../common/text-writer';

@Injectable
@Provide({
    singleton: false,
})
export class MazeView extends AbstractListMenuView {

    protected static readonly listData: MenuListItemInterface[] = [
        {
            text: 'No maze',
            setCursorCondition() {
                return this.currentMaze === 1;
            },
            callback() {
                AppState.setMaze(1);
                this.back();
            },
        },
        {
            text: 'Box',
            setCursorCondition() {
                return this.currentMaze === 2;
            },
            callback() {
                AppState.setMaze(2);
                this.back();
            },
        },
        {
            text: 'Cross',
            setCursorCondition() {
                return this.currentMaze === 3;
            },
            callback() {
                AppState.setMaze(3);
                this.back();
            },
        },
        {
            text: 'Tunnel',
            setCursorCondition() {
                return this.currentMaze === 4;
            },
            callback() {
                AppState.setMaze(4);
                this.back();
            },
        },
        {
            text: 'Spiral',
            setCursorCondition() {
                return this.currentMaze === 5;
            },
            callback() {
                AppState.setMaze(5);
                this.back();
            },
        },
        {
            text: 'Racetrack',
            setCursorCondition() {
                return this.currentMaze === 6;
            },
            callback() {
                AppState.setMaze(6);
                this.back();
            },
        },
    ];
    protected readonly header = 'MAZE';
    protected readonly parentView: ConstructorInterface = MainMenu;

    private currentMaze: number;

    constructor(protected config: Config,
                protected stageHandler$: StageHandler<StageEvent<any>>,
                protected canvas: Canvas,
                protected onClick$: ClickObservable<ClicksEnum>,
                protected textWriter: TextWriter,
                protected drawingService: DrawingService) {
        super(config, stageHandler$, canvas, onClick$, textWriter, drawingService );
        this.currentMaze = AppState.getMaze();
    }

    protected getListData(): MenuListItemInterface[] {
        return MazeView.listData;
    }

    protected back() {
        this.stageHandler$.next(new StageEvent(MainMenu, MainMenuKeysEnum.MAZES));
    }

}
