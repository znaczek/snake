import {Position} from '../../../common/model/position.model';
import {AnimationDataInterface} from '../interfaces/animation-data.interface';

export const animationData: AnimationDataInterface[][] = [
    /* tslint:disable:max-line-length */
    [],
    [
        {position: new Position(2, 0), filled: true},
        {position: new Position(3, 0), filled: false}, {position: new Position(3, 1), filled: true},
    ],
    [
        {position: new Position(1, 0), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: true},
        {position: new Position(3, 0), filled: false}, {position: new Position(3, 1), filled: false}, {position: new Position(3, 2), filled: true},
    ],
    [
        {position: new Position(0, 0), filled: true},
        {position: new Position(1, 0), filled: false}, {position: new Position(1, 1), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: true},
        {position: new Position(3, 2), filled: false}, {position: new Position(3, 3), filled: true},
    ],
    [
        {position: new Position(0, 1), filled: true},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: true},
        {position: new Position(3, 3), filled: false}, {position: new Position(3, 4), filled: true},
    ],
    [
        {position: new Position(0, 2), filled: true},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: false}, {position: new Position(1, 3), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: false}, {position: new Position(2, 4), filled: true},
        {position: new Position(3, 4), filled: false}, {position: new Position(3, 5), filled: true},
    ],
    [
        {position: new Position(0, 2), filled: false}, {position: new Position(0, 3), filled: true},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: false}, {position: new Position(1, 3), filled: false}, {position: new Position(1, 4), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: false}, {position: new Position(2, 4), filled: false}, {position: new Position(2, 5), filled: true},
        {position: new Position(3, 5), filled: false},
    ],
    [
        {position: new Position(0, 2), filled: false}, {position: new Position(0, 3), filled: false}, {position: new Position(0, 4), filled: true},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: false}, {position: new Position(1, 3), filled: false}, {position: new Position(1, 4), filled: false}, {position: new Position(1, 5), filled: true},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: false}, {position: new Position(2, 4), filled: false}, {position: new Position(2, 5), filled: false},
        {position: new Position(3, 5), filled: false},
    ],
    [
        {position: new Position(0, 2), filled: false}, {position: new Position(0, 4), filled: false}, {position: new Position(0, 5), filled: true},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: false}, {position: new Position(1, 3), filled: false}, {position: new Position(1, 4), filled: false}, {position: new Position(1, 5), filled: false},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: false}, {position: new Position(2, 4), filled: false}, {position: new Position(2, 5), filled: false},
        {position: new Position(3, 5), filled: false},
    ],
    [
        {position: new Position(0, 2), filled: false}, {position: new Position(0, 5), filled: false},
        {position: new Position(1, 1), filled: false}, {position: new Position(1, 2), filled: false}, {position: new Position(1, 3), filled: false}, {position: new Position(1, 4), filled: false}, {position: new Position(1, 5), filled: false},
        {position: new Position(2, 0), filled: false}, {position: new Position(2, 1), filled: false}, {position: new Position(2, 2), filled: false}, {position: new Position(2, 3), filled: false}, {position: new Position(2, 4), filled: false}, {position: new Position(2, 5), filled: false},
        {position: new Position(3, 5), filled: false},
    ],
    [
        {position: new Position(0, 2), filled: true}, {position: new Position(0, 5), filled: true},
        {position: new Position(1, 1), filled: true}, {position: new Position(1, 2), filled: true}, {position: new Position(1, 3), filled: true}, {position: new Position(1, 4), filled: true}, {position: new Position(1, 5), filled: true},
        {position: new Position(2, 0), filled: true}, {position: new Position(2, 1), filled: true}, {position: new Position(2, 2), filled: true}, {position: new Position(2, 3), filled: true}, {position: new Position(2, 4), filled: true}, {position: new Position(2, 5), filled: true},
        {position: new Position(3, 5), filled: true},
    ],
    /* tslint:enable:max-line-length */
];
