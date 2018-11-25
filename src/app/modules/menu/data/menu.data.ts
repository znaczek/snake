import {MenuDataInterface} from '../interfaces/menu-data.interface';
import {AppEvent} from '../../../common/model/game-event.model';

export const menuData: MenuDataInterface = {
    text: 'ROOT',
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
                    text: 'Back',
                    ordinal: 1,
                    back: true,
                },
                {
                    text: '1',
                    ordinal: 2,
                    callback() {},
                    callbackArgs: {level: 1},
                },
                {
                    text: '2',
                    ordinal: 3,
                    callback() {},
                    callbackArgs: {level: 2},
                },
                {
                    text: '3',
                    ordinal: 4,
                    callback() {},
                    callbackArgs: {level: 3},
                },
            ],
        },
        {
            text: 'Mazes',
            ordinal: 3,
            children: [
                {
                    text: 'Back',
                    ordinal: 1,
                    back: true,
                },
                {
                    text: '1',
                    ordinal: 2,
                    callback() {},
                    callbackArgs: {maze: 1},
                },
                {
                    text: '2',
                    ordinal: 3,
                    callback() {},
                    callbackArgs: {maze: 2},
                },
                {
                    text: '3',
                    ordinal: 4,
                    callback() {},
                    callbackArgs: {maze: 3},
                },
            ],
        },
        {
            text: 'High scores',
            ordinal: 4,
            callback() {},
        },
        {
            text: 'Exit',
            ordinal: 5,
            callback() {},
        },
    ],
};
