import {TextWriter} from '../../../common/text-writer';
import {MenuItem} from '../model/menu-item.model';
import {MenuDataInterface} from '../interfaces/menu-data.interface';
import {Injectable} from '../../../common/di/injectable';

@Injectable
export class MenuItemFactory {
    constructor(private textWriter: TextWriter) {
    }

    public create(options: MenuDataInterface, parent?: MenuItem): MenuItem {
        const newMenuItem: MenuItem = new MenuItem({
            text: this.textWriter.write(options.text),
            id: options.id,
            callback: options.callback,
            setCursorCondition: options.setCursorCondition,
            visible: options.visible,
            back: options.back,
            parent,
            customView: options.customView,
        });
        newMenuItem.children = (options.children || []).map((item) => this.create(item, newMenuItem));
        return newMenuItem;
    }
}
