import {CustomViewConstructorInterface} from '../../../common/interfaces/custom-view-constructor.interface';

export interface MenuDataInterface {
    text: string;
    id: number;
    callback?: () => void;
    customView?: CustomViewConstructorInterface;
    visible?: ()=> boolean;
    setCursorCondition?: () => boolean;
    back?: boolean;
    children?: MenuDataInterface[];
}
