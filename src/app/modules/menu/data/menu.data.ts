import {MenuDataInterface} from '../interfaces/menu-data.interface';
import {AppEvent} from '../../../common/model/game-event.model';
import {TopScoreView} from '../views/topScore/top-score.view';
import {AppState} from '../../../common/app-state';

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
            children: [
                {
                    text: '1',
                    id: 131,
                    setCursorCondition() {return this.checkLevelCursor(1);},
                    callback() {return this.setLevel(1);},
                },
                {
                    text: '2',
                    id: 132,
                    setCursorCondition() {return this.checkLevelCursor(2);},
                    callback() {return this.setLevel(2);},
                },
                {
                    text: '3',
                    id: 133,
                    setCursorCondition() {return this.checkLevelCursor(3);},
                    callback() {return this.setLevel(3);},
                },
                {
                    text: '4',
                    id: 134,
                    setCursorCondition() {return this.checkLevelCursor(4);},
                    callback() {return this.setLevel(4);},
                },
                {
                    text: '5',
                    id: 135,
                    setCursorCondition() {return this.checkLevelCursor(5);},
                    callback() {return this.setLevel(5);},
                },
                {
                    text: '6',
                    id: 136,
                    setCursorCondition() {return this.checkLevelCursor(6);},
                    callback() {return this.setLevel(6);},
                },
                {
                    text: '7',
                    id: 137,
                    setCursorCondition() {return this.checkLevelCursor(7);},
                    callback() {return this.setLevel(7);},
                },
                {
                    text: '8',
                    id: 138,
                    setCursorCondition() {return this.checkLevelCursor(8);},
                    callback() {return this.setLevel(8);},
                },
                {
                    text: '9',
                    id: 139,
                    setCursorCondition() {return this.checkLevelCursor(9);},
                    callback() {return this.setLevel(9);},
                },
                {
                    text: 'Back',
                    id: 1310,
                    back: true,
                },
            ],
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
                {
                    text: 'Back',
                    id: 147,
                    back: true,
                },
            ],
        },
        {
            text: 'Top score',
            id: 15,
            customView: TopScoreView,
        },
        {
            text: 'Exit',
            id: 16,
            callback() {},
        },
    ],
};
