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
                    text: '1',
                    ordinal: 1,
                    callback: 'setLebel',
                    callbackArgs: {lebel: 1},
                },
                {
                    text: '2',
                    ordinal: 2,
                    callback: 'setLebel',
                    callbackArgs: {lebel: 2},
                },
                {
                    text: '3',
                    ordinal: 3,
                    callback: 'setLebel',
                    callbackArgs: {lebel: 3},
                },
            ],
        },
    ],
};
