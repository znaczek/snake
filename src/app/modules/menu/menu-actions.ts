import {Subject} from 'rxjs/index';
import {AppEvent} from '../../common/model/game-event.model';

export class MenuActions {
    private callbacks: {[index: string]: (args: {}) => void} = {
        startGame: () => {
            this.stageHandler.next(AppEvent.startGame());
        },
    };

    public constructor(private stageHandler: Subject<AppEvent>) {
    }

    public call(name: string, args: {}) {
        if (typeof this.callbacks[name] === 'function') {
            this.callbacks[name](args);
        }
    }

}
