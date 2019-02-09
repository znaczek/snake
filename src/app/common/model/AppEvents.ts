/* tslint:disable:max-classes-per-file */
export enum AppEventTypes {
    START_INTRO,
    START_MENU,
    START_GAME,
    END_GAME,
}

export interface AppEvent<T = undefined> {
    type: AppEventTypes;
    payload?: T;
}

export class StartIntroEvent implements AppEvent {
    public type: AppEventTypes;

    constructor() {
        this.type = AppEventTypes.START_INTRO;
    }
}

export class StartMenuEvent implements AppEvent {
    public type: AppEventTypes;

    constructor() {
        this.type = AppEventTypes.START_MENU;
    }
}

export class StartGameEvent implements AppEvent<{resumed: boolean}> {
    public type: AppEventTypes;
    public payload: {resumed: boolean};

    constructor(resumed: boolean) {
        this.type = AppEventTypes.START_GAME;
        this.payload = {
            resumed,
        };
    }
}

export class EndGameEvent implements AppEvent {
    public type: AppEventTypes;

    constructor() {
        this.type = AppEventTypes.END_GAME;
    }
}
/* tslint:enable:max-classes-per-file */
