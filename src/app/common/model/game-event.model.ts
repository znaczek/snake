export class AppEvent<T = undefined> {
    public static readonly START_MENU = 'START_MENU';
    public static readonly START_GAME = 'START_GAME';
    public static readonly END_GAME = 'END_GAME';

    public static startMenu(): AppEvent {
        return new AppEvent(AppEvent.START_MENU);
    }

    public static startGame(resumed: boolean = false): AppEvent<{resumed: boolean}> {
        return new AppEvent(AppEvent.START_GAME, {
            resumed,
        });
    }

    public static endGame(): AppEvent {
        return new AppEvent(AppEvent.END_GAME);
    }

    public type: string;
    public payload: T;

    constructor(type: string, payload?: T) {
        this.type = type;
        this.payload = payload;
    }
}
