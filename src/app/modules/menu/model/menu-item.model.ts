import {AppText} from '../../../common/model/game-text.model';

export class MenuItem {
    public text: AppText;
    public ordinal: number;
    public callback?: string;
    public callbackArgs?: {[index: string]: any};
    public children?: MenuItem[];

    constructor(options: {
        text: AppText
        ordinal: number,
        callback?: string,
        callbackArgs?: {[index: string]: any},
        children?: MenuItem[],
    }) {
        this.text = options.text;
        this.ordinal = options.ordinal;
        this.callback = options.callback;
        this.callbackArgs = options.callbackArgs;
        this.children = options.children;
    }

}
