import {Pixel} from '../../../common/model/pixel.model';
import {TextWriter} from '../../../common/text-writer';
import {textSmallData} from '../../../common/data/text-small.data';
import * as config from '../../../../config';
import {MENU_ITEM_HEIGHT, MENU_ITEM_WIDTH} from '../constants/menu-item.constants';
import {Position} from '../../../common/model/position.model';

export class DrawingUtils {
    public static getMenuItemBackground(yOffset: number = 0): Pixel[] {
        const pixels: Pixel[] = [];
        for(let x = 0; x < MENU_ITEM_WIDTH; x += 1) {
            for(let y = yOffset; y < yOffset + MENU_ITEM_HEIGHT; y += 1) {
                pixels.push(new Pixel(x, y));
            }
        }
        return pixels;
    }

    constructor(private textWriter: TextWriter) {
    }

    public drawMenuHeader(text: string): Pixel[] {
        this.textWriter.setCharData(textSmallData);
        const pixels: Pixel[] = this.textWriter.write('SNAKE II - ' + text.toUpperCase(), new Position(2, 1)).getPixels();
        for (let i = 0; i < config.CANVAS_WIDTH; i += 1) {
            pixels.push(new Pixel(i, config.TOP_BAR_HEIGHT - 2));
        }
        return pixels;
    }
}
