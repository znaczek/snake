import {AppEventPayloadInterface} from '../interfaces/app-event-payload.interface';

export class AppEvent {
    public static readonly START_MENU = 'START_MENU';
    public static readonly START_GAME = 'START_GAME';
    public static readonly END_GAME = 'END_GAME';

    public static startMenu(): AppEvent {
        return new AppEvent(AppEvent.START_MENU);
    }

    public static startGame(): AppEvent {
        return new AppEvent(AppEvent.START_GAME);
    }

    public static endGame(): AppEvent {
        return new AppEvent(AppEvent.END_GAME);
    }

    public type: string;
    public payload: AppEventPayloadInterface;

    constructor(type: string, payload?: AppEventPayloadInterface) {
        this.type = type;
        this.payload = payload;
    }
}
