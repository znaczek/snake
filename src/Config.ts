import {Observable} from 'rxjs/index';
import {WindowParams} from './app/common/model/window-params.model';

/**
 * Default parameters:
 * CANVAS_WIDTH = 24 * 4;
 * CANVAS_HEIGHT = 14 * 4;
 * MOVE = 4;
 * PIXEL_SIZE = 10;
 * INIT_LENGTH = 3;
 * INIT_HEAD = {x: 34, y: 18};
 */

export class Config {

    public static readonly DEBUG_INTRO = false;
    public static readonly DEBUG_CANVAS = false;
    public static readonly DEBUG_MOVING = false;

    public static readonly MOVE = 4;
    public static readonly SPEED = 200;
    public static readonly TOP_BAR_HEIGHT = 9;
    public static readonly INIT_LENGTH = 3;

    public static readonly PIXEL_SIZE = 10;

    public static readonly GAME_CANVAS_WIDTH = 24 * Config.MOVE;
    public static readonly GAME_CANVAS_HEIGHT = 14 * Config.MOVE;

    public static readonly INIT_HEAD = {
        x: 34,
        y: 18,
    };

    public static readonly CANVAS_WIDTH = Config.GAME_CANVAS_WIDTH;
    public static readonly CANVAS_HEIGHT = Config.GAME_CANVAS_HEIGHT + Config.TOP_BAR_HEIGHT;
    public static readonly CANVAS_WIDTH_PX = Config.PIXEL_SIZE * Config.CANVAS_WIDTH;
    public static readonly CANVAS_HEIGHT_PX = Config.PIXEL_SIZE * Config.CANVAS_HEIGHT;
    public static readonly BOARD_HEIGHT = Config.GAME_CANVAS_HEIGHT - 4;
    public static readonly BOARD_WIDTH = Config.GAME_CANVAS_WIDTH - 4;
    public static readonly BOARD = {
        start: {
            x: 2,
            y: 2,
        },
        end: {
            x: 2 + Config.BOARD_WIDTH,
            y: 2 + Config.BOARD_HEIGHT,
        },
    };

    private params: WindowParams;

    constructor(private windowParams: Observable<WindowParams>) {
        this.windowParams.subscribe((params) => {
            console.log(params.width, params.height);
            this.params = params;
        });
    }
}
