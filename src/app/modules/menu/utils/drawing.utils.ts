import {Pixel} from '../../../common/model/pixel.model';
import {TextWriter} from '../../../common/text-writer';
import {textSmallData} from '../../../common/data/text-small.data';
import {Config} from '../../../../Config';
import {MENU_ITEM_HEIGHT} from '../constants/menu-item.constants';
import {Position} from '../../../common/model/position.model';
import {ColorsEnum} from '../../../common/enums/color.enums';

export class DrawingUtils {
    public static getMenuItemBackground(yOffset: number = 0): Pixel[] {
        const pixels: Pixel[] = [];
        for(let x = 0; x < Config.CANVAS_WIDTH - 7; x += 1) {
            for(let y = yOffset; y < yOffset + MENU_ITEM_HEIGHT; y += 1) {
                pixels.push(new Pixel(x, y));
            }
        }
        return pixels;
    }

    public static drawScrollBar(cursor: number, count: number): Pixel[] {
        const pixels: Pixel[] = [];
        const availableOffsetHeight = DrawingUtils.scrollbarHeight - Config.TOP_BAR_HEIGHT - DrawingUtils.scrollbarIndicatorHeight;
        const offset = Math.round((cursor / (count - 1)) * (availableOffsetHeight));
        for (let i = Config.TOP_BAR_HEIGHT; i < DrawingUtils.scrollbarHeight; i += 1) {
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 6, i));
        }
        for (let i = 0; i < 3; i += 1) {
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 5 + i, Config.TOP_BAR_HEIGHT + offset));
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 5 + i, Config.TOP_BAR_HEIGHT + 6 + offset));
        }
        for (let i = 0; i < DrawingUtils.scrollbarIndicatorHeight - 2; i += 1) {
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 2, i + Config.TOP_BAR_HEIGHT + 1 + offset));
            pixels.push(new Pixel(Config.GAME_CANVAS_WIDTH - 6, i + Config.TOP_BAR_HEIGHT + 1 + offset, ColorsEnum.GREEN));
        }
        return pixels;
    }

    private static readonly scrollbarHeight: number = Config.CANVAS_HEIGHT - 1;
    private static readonly scrollbarIndicatorHeight: number = 7;

    constructor(private textWriter: TextWriter) {
    }

    public drawMenuHeader(text: string): Pixel[] {
        this.textWriter.setCharData(textSmallData);
        const pixels: Pixel[] = this.textWriter.write('SNAKE II - ' + text.toUpperCase(), new Position(2, 1)).getPixels();
        for (let i = 0; i < Config.CANVAS_WIDTH; i += 1) {
            pixels.push(new Pixel(i, Config.TOP_BAR_HEIGHT - 2));
        }
        return pixels;
    }
}
