import {AppText} from '../../../common/model/game-text.model';
import {CustomViewConstructorInterface} from '../../../common/interfaces/custom-view-constructor.interface';

export class MenuItem {
    public text: AppText;
    public ordinal: number;
    public callback: () => void;
    public customView: CustomViewConstructorInterface;
    public setCursorCondition: () => boolean;
    public back: boolean;
    public parent: MenuItem;
    public children?: MenuItem[];

    constructor(options: {
        text: AppText
        ordinal: number,
        callback?: () => void,
        customView?: CustomViewConstructorInterface,
        setCursorCondition?: () => boolean,
        back?: boolean,
        parent?: MenuItem,
    }) {
        this.text = options.text;
        this.ordinal = options.ordinal;
        this.back = options.back;
        this.parent = options.parent;
        this.setCursorCondition = options.setCursorCondition;
        this.callback = options.callback;
        this.customView = options.customView;
    }

}
