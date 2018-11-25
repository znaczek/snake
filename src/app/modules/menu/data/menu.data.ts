import {MenuDataInterface} from '../interfaces/menu-data.interface';

export const menuData: MenuDataInterface = {
    text: 'ROOT',
    ordinal: 1,
    children: [
        {
            text: 'New game',
            ordinal: 1,
            callback: 'startGame',
        },
        {
            text: 'Level',
            ordinal: 2,
            children: [
                {
                    text: 'Back',
                    ordinal: 1,
                    callback: 'goBack',
                },
                {
                    text: '1',
                    ordinal: 2,
                    callback: 'setLevel',
                    callbackArgs: {level: 1},
                },
                {
                    text: '2',
                    ordinal: 3,
                    callback: 'setLevel',
                    callbackArgs: {level: 2},
                },
                {
                    text: '3',
                    ordinal: 4,
                    callback: 'setLevel',
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
                    callback: 'goBack',
                },
                {
                    text: '1',
                    ordinal: 2,
                    callback: 'setMaze',
                    callbackArgs: {maze: 1},
                },
                {
                    text: '2',
                    ordinal: 3,
                    callback: 'setMaze',
                    callbackArgs: {maze: 2},
                },
                {
                    text: '3',
                    ordinal: 4,
                    callback: 'setMaze',
                    callbackArgs: {maze: 3},
                },
            ],
        },
        {
            text: 'High scores',
            ordinal: 4,
            callback: 'showHighScores',
        },
        {
            text: 'Exit',
            ordinal: 5,
            callback: 'exit',
        },
    ],
};
