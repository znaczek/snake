import {MenuDataInterface} from '../interfaces/menu-data.interface';
import {AppEvent} from '../../../common/model/game-event.model';
import {TopScoreView} from '../views/topScore/top-score.view';
import {AppState} from '../../../common/app-state';
import {LevelView} from '../views/level/top-score.view';

export const menuData: MenuDataInterface = {
    text: 'Menu',
    id: 1,
    children: [
        {
            text: 'Continue',
            id: 11,
            callback() {
                this.close();
                this.stageHandler$.next(AppEvent.startGame(true));
            },
            visible: () => !!AppState.getGameData(),
        },
        {
            text: 'New game',
            id: 12,
            callback() {
                this.close();
                this.stageHandler$.next(AppEvent.startGame());
            },
        },
        {
            text: 'Level',
            id: 13,
            customView: LevelView,
        },
        {
            text: 'Mazes',
            id: 14,
            children: [
                {
                    text: 'No maze',
                    id: 141,
                    setCursorCondition() {return this.checkMazeCursor(1);},
                    callback() {return this.setMaze(1);},
                },
                {
                    text: 'Box',
                    id: 142,
                    setCursorCondition() {return this.checkMazeCursor(2);},
                    callback() {return this.setMaze(2);},
                },
                {
                    text: 'Cross',
                    id: 143,
                    setCursorCondition() {return this.checkMazeCursor(3);},
                    callback() {return this.setMaze(3);},
                },
                {
                    text: 'Tunnel',
                    id: 144,
                    setCursorCondition() {return this.checkMazeCursor(4);},
                    callback() {return this.setMaze(4);},
                },
                {
                    text: 'Spiral',
                    id: 145,
                    setCursorCondition() {return this.checkMazeCursor(5);},
                    callback() {return this.setMaze(5);},
                },
                {
                    text: 'Racetrack',
                    id: 146,
                    setCursorCondition() {return this.checkMazeCursor(6);},
                    callback() {return this.setMaze(6);},
                },
            ],
        },
        {
            text: 'Top score',
            id: 15,
            customView: TopScoreView,
        },
    ],
};
