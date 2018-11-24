import {AppText} from '../../../common/model/game-text.model';

export class MenuItem {
    constructor(public text: AppText,
                public ordinal: number,
                public children: MenuItem[] = []) {
        this.text = text;
    }

}
