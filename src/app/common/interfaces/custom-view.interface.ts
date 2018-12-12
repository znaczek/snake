import {Subject} from 'rxjs';

export interface CustomViewInterface {
    draw: (options?: any) => void;
    exit$: Subject<void>;
}
