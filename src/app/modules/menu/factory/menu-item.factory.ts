import {TextWriter} from '../../../common/text-writer';
import {MenuItem} from '../model/menu-item.model';
import {MenuDataInterface} from '../interfaces/menu-data.interface';

export class MenuItemFactory {
    constructor(private textWriter: TextWriter) {
    }

    public create(options: MenuDataInterface, parent?: MenuItem): MenuItem {
        const newMenuItem: MenuItem = new MenuItem({
            text: this.textWriter.write(options.text),
            ordinal: options.ordinal,
            callback: options.callback,
            back: options.back,
            parent,
            callbackArgs: options.callbackArgs,
        });
        newMenuItem.children = (options.children || []).map((item) => this.create(item, newMenuItem));
        return newMenuItem;
    }
}
