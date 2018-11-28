import {MenuDataInterface} from '../interfaces/menu-data.interface';
import {AppEvent} from '../../../common/model/game-event.model';
import {HighScoresView} from '../views/high-scores.view';

export const menuData: MenuDataInterface = {
    text: 'Menu',
    ordinal: 1,
    children: [
        {
            text: 'New game',
            ordinal: 1,
            callback() {
                this.stageHandler.next(AppEvent.startGame());
                this.close();
            },
        },
        {
            text: 'Level',
            ordinal: 2,
            children: [
                {
                    text: '1',
                    ordinal: 1,
                    setCursorCondition() {return this.checkLevelCursor(1);},
                    callback() {this.setLevel(1);},
                },
                {
                    text: '2',
                    ordinal: 2,
                    setCursorCondition() {return this.checkLevelCursor(2);},
                    callback() {this.setLevel(2);},
                },
                {
                    text: '3',
                    ordinal: 3,
                    setCursorCondition() {return this.checkLevelCursor(3);},
                    callback() {this.setLevel(3);},
                },
                {
                    text: 'Back',
                    ordinal: 4,
                    back: true,
                },
            ],
        },
        {
            text: 'Mazes',
            ordinal: 3,
            children: [
                {
                    text: '1',
                    ordinal: 1,
                    setCursorCondition() {return this.checkMazeCursor(1);},
                    callback() {this.setMaze(1);},
                },
                {
                    text: '2',
                    ordinal: 2,
                    setCursorCondition() {return this.checkMazeCursor(2);},
                    callback() {this.setMaze(2);},
                },
                {
                    text: '3',
                    ordinal: 3,
                    setCursorCondition() {return this.checkMazeCursor(3);},
                    callback() {this.setMaze(3);},
                },
                {
                    text: 'Back',
                    ordinal: 4,
                    back: true,
                },
            ],
        },
        {
            text: 'High scores',
            ordinal: 4,
            customView: HighScoresView,
            children: [
                {
                    text: 'Back',
                    ordinal: 1,
                    back: true,
                },
            ],
        },
        {
            text: 'Exit',
            ordinal: 5,
            callback() {},
        },
    ],
};
