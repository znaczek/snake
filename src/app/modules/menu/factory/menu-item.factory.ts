import {TextWriter} from '../../../common/text-writer';
import {MenuItem} from '../model/menu-item.model';
import {MenuDataInterface} from '../interfaces/menu-data.interface';

export class MenuItemFactory {
    constructor(private textWriter: TextWriter) {
    }

    public create(options: MenuDataInterface): MenuItem {
        return new MenuItem({
            text: this.textWriter.write(options.text),
            ordinal: options.ordinal,
            callback: options.callback,
            callbackArgs: options.callbackArgs,
            children: (options.children || []).map((item) => this.create(item)),
        });
    }
}
