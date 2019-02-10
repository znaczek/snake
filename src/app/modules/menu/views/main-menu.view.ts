import {StageEvent} from '../../../common/model/StageEvents';
import {AppState} from '../../../common/app-state';
import {Injectable} from '../../../common/di/injectable';
import {Provide} from '../../../common/di/provide';
import {TopScoreView} from './top-score.view';
import {LevelView} from './level.view';
import {Game} from '../../game/views/game.view';
import {MazeView} from './maze.view';
import {MenuListItemInterface} from '../interfaces/menu-list-item.interface';
import {AbstractListMenuView} from './abstract-list-menu.view';
import {ConstructorInterface} from '../../../common/interfaces/constructor.interface';

export enum MainMenuKeysEnum {
    CONTINUE,
    NEW_GAME,
    LEVEL,
    MAZES,
    TOP_SCORE,
}

@Injectable
@Provide({
    singleton: false,
})
export class MainMenu extends AbstractListMenuView {

    public static readonly listData: MenuListItemInterface[] = [
        {
            key: MainMenuKeysEnum.CONTINUE,
            text: 'Continue',
            callback() {
                this.stageHandler$.next(new StageEvent(Game, AppState.getGameData()));
            },
            visible: () => !!AppState.getGameData(),
        },
        {
            key: MainMenuKeysEnum.NEW_GAME,
            text: 'New game',
            callback() {
                this.stageHandler$.next(new StageEvent(Game));
            },
        },
        {
            key: MainMenuKeysEnum.LEVEL,
            text: 'Level',
            callback() {
                this.stageHandler$.next(new StageEvent(LevelView));
            },
        },
        {
            key: MainMenuKeysEnum.MAZES,
            text: 'Mazes',
            callback() {
                this.stageHandler$.next(new StageEvent(MazeView));
            },
        },
        {
            key: MainMenuKeysEnum.TOP_SCORE,
            text: 'Top score',
            callback() {
                this.stageHandler$.next(new StageEvent(TopScoreView));
            },
        },
    ];
    protected readonly header = 'MENU';
    protected readonly parentView: ConstructorInterface = null;

    protected getListData(): MenuListItemInterface[] {
        return MainMenu.listData;
    }

}
