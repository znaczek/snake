import {Subject} from 'rxjs/index';
import {StageEvent} from '../model/StageEvents';

export class StageHandler {
    private _subject: Subject<StageEvent<any>> = new Subject();

    public get subject(): Subject<StageEvent<any>> {
        return this._subject;
    }

    public next(event: StageEvent<any>) {
        this._subject.next(event);
    }

}
