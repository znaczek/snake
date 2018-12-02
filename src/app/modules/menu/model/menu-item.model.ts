import {AppText} from '../../../common/model/game-text.model';
import {CustomViewConstructorInterface} from '../../../common/interfaces/custom-view-constructor.interface';

export class MenuItem {
    public text: AppText;
    public id: number;
    public callback: () => void;
    public customView: CustomViewConstructorInterface;
    public visible: () => boolean;
    public setCursorCondition: () => boolean;
    public back: boolean;
    public parent: MenuItem;
    public children?: MenuItem[];

    constructor(options: {
        text: AppText
        id: number,
        callback?: () => void,
        customView?: CustomViewConstructorInterface,
        visible?: () => boolean,
        setCursorCondition?: () => boolean,
        back?: boolean,
        parent?: MenuItem,
    }) {
        this.text = options.text;
        this.id = options.id;
        this.back = options.back;
        this.parent = options.parent;
        this.visible = options.visible;
        this.setCursorCondition = options.setCursorCondition;
        this.callback = options.callback;
        this.customView = options.customView;
    }

}
