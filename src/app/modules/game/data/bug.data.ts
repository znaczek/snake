import {BugTypesEnum} from '../enums/bug-types.enum';
import {Position} from '../../../common/model/position.model';

export const bugData: {[index: string]: Position[]} = {
    [BugTypesEnum.WHALE]: [
        new Position(0, 1), new Position(0, 2),
        new Position(1, 3),
        new Position(2, 2), new Position(2, 3),
        new Position(3, 1), new Position(3, 2), new Position(3, 3),
        new Position(4, 0), new Position(4, 1), new Position(4, 2), new Position(4, 3),
        new Position(5, 0), new Position(5, 2), new Position(5, 3),
        new Position(6, 1), new Position(6, 2), new Position(6, 3),
        new Position(7, 3),
    ],
    [BugTypesEnum.MONKEY]: [
        new Position(0, 1), new Position(0, 2), new Position(0, 3),
        new Position(1, 1),
        new Position(2, 0), new Position(2, 1), new Position(2, 2), new Position(2, 3),
        new Position(3, 0), new Position(3, 1), new Position(3, 2),
        new Position(4, 0), new Position(4, 1), new Position(4, 2),
        new Position(5, 0), new Position(5, 1), new Position(5, 2), new Position(5, 3),
        new Position(6, 1),
        new Position(7, 1), new Position(7, 2), new Position(7, 3),
    ],
    [BugTypesEnum.MILLIPEDE]: [
        new Position(0, 1), new Position(0, 2),
        new Position(1, 2), new Position(1, 3),
        new Position(2, 2),
        new Position(3, 2), new Position(3, 3),
        new Position(4, 2),
        new Position(5, 2), new Position(5, 3),
        new Position(6, 2),
        new Position(7, 2), new Position(7, 3),

    ],
    [BugTypesEnum.LADYBUG]: [
        new Position(0, 1), new Position(0, 2),
        new Position(1, 0), new Position(1, 2),
        new Position(2, 1), new Position(2, 2), new Position(2, 3),
        new Position(3, 0), new Position(3, 1), new Position(3, 2),
        new Position(4, 1), new Position(4, 2),
        new Position(5, 0), new Position(5, 1), new Position(5, 2), new Position(5, 3),
        new Position(6, 1), new Position(6, 2),
        new Position(7, 2),
    ],
    [BugTypesEnum.FISH]: [
        new Position(0, 2),
        new Position(1, 1), new Position(1, 2),
        new Position(2, 0), new Position(2, 2), new Position(2, 3),
        new Position(3, 0), new Position(3, 1), new Position(3, 2), new Position(3, 3),
        new Position(4, 1), new Position(4, 2), new Position(4, 3),
        new Position(5, 2), new Position(5, 3),
        new Position(6, 1), new Position(6, 2),
    ],
    [BugTypesEnum.FILEFLY]: [
        new Position(0, 0), new Position(0, 1),
        new Position(1, 0), new Position(1, 1),
        new Position(2, 2),
        new Position(3, 1), new Position(3, 2), new Position(3, 3),
        new Position(4, 0), new Position(4, 1), new Position(4, 2),
        new Position(5, 1), new Position(5, 2), new Position(5, 3),
        new Position(6, 2),
    ],
};
