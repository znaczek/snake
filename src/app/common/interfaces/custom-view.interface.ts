import {Subject} from 'rxjs';

export interface CustomViewInterface {
    draw: () => void;
    exit: Subject<void>;
}
