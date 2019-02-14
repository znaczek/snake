import {Injectable} from '../../../common/di/injectable';
import {AbstractListMenuView} from './abstract-list-menu.view';
import {MenuListItemInterface} from '../interfaces/menu-list-item.interface';
import {StageEvent} from '../../../common/model/StageEvents';
import {MainMenu, MainMenuKeysEnum} from './main-menu.view';
import {AppState} from '../../../common/app-state';
import {ConstructorInterface} from '../../../common/interfaces/constructor.interface';
import {Canvas} from '../../../common/services/canvas';
import {ClickHandler} from '../../../common/services/click-handler';
import {Config} from '../../../../config';
import {StageHandler} from '../../../common/services/stage-handler';
import {DrawingService} from '../service/drawing.service';
import {TextWriter} from '../../../common/services/text-writer';

@Injectable
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
                protected stageHandler: StageHandler,
                protected canvas: Canvas,
                protected clickHandler: ClickHandler,
                protected textWriter: TextWriter,
                protected drawingService: DrawingService) {
        super(config, stageHandler, canvas, clickHandler, textWriter, drawingService );
        this.currentMaze = AppState.getMaze();
    }

    protected getListData(): MenuListItemInterface[] {
        return MazeView.listData;
    }

    protected back() {
        this.stageHandler.next(new StageEvent(MainMenu, MainMenuKeysEnum.MAZES));
    }

}
