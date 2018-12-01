import {CustomViewConstructorInterface} from '../../../common/interfaces/custom-view-constructor.interface';

export interface MenuDataInterface {
    text: string;
    ordinal: number;
    callback?: () => void;
    customView?: CustomViewConstructorInterface;
    setCursorCondition?: () => boolean;
    back?: boolean;
    children?: MenuDataInterface[];
}
