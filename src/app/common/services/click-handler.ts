import {Observable} from 'rxjs/index';
import {ClicksEnum} from '../enums/clicks.enum';

export class ClickHandler {
    public onClick$: Observable<ClicksEnum>;
}
