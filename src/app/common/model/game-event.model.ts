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

    public static endGame(score: number): AppEvent {
        return new AppEvent(AppEvent.END_GAME, {
            score,
        });
    }

    public type: string;
    public payload: {score: number};

    constructor(type: string, payload?: {score: number}) {
        this.type = type;
        this.payload = payload;
    }
}
