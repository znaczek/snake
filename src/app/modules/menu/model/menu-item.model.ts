import {AppText} from '../../../common/model/game-text.model';

export class MenuItem {
    public text: AppText;
    public ordinal: number;
    public callback: () => void;
    public setCursorCondition: () => boolean;
    public back: boolean;
    public parent: MenuItem;
    public callbackArgs?: {[index: string]: any};
    public children?: MenuItem[];

    constructor(options: {
        text: AppText
        ordinal: number,
        callback?: () => void,
        setCursorCondition?: () => boolean,
        back?: boolean,
        parent?: MenuItem,
        callbackArgs?: {[index: string]: any},
    }) {
        this.text = options.text;
        this.ordinal = options.ordinal;
        this.back = options.back;
        this.parent = options.parent;
        this.setCursorCondition = options.setCursorCondition;
        this.callback = options.callback;
        this.callbackArgs = options.callbackArgs;
    }

}
