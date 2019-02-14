import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {DrawingConfigInterface} from './app/common/interfaces/drawing-config.interface';
import {Injectable} from './app/common/di/injectable';
import {WindowParamsModel} from './app/common/model/window-params.model';

declare global {
    interface Window {
        opera: any;
        printPixels: () => void;
        toggle: () => void;
        clearBoard: () => void;
    }
}

/**
 * Default parameters:
 * CANVAS_WIDTH = 24;
 * CANVAS_HEIGHT = 14 * 4;
 * MOVE = 4;
 * PIXEL_SIZE = 10;
 * INIT_LENGTH = 3;
 * INIT_HEAD = {x: 34, y: 18};
 */
@Injectable
export class Config {
    public static readonly isMobile = ((a) => {
            /* tslint:disable:max-line-length */
            const isMoblie = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
            /* tslint:enable:max-line-length */
            if (isMoblie) {
                window.document.documentElement.className = 'mobile';
            }
            return isMoblie;
        }
    )(navigator.userAgent || navigator.vendor || window.opera);

    public static readonly DEBUG_INTRO = false;
    public static readonly DEBUG_CANVAS = false;
    public static readonly DEBUG_MOVING = false;
    public static readonly DEBUG_SERVICE_WORKER = false;
    public static readonly BLACKBOARD = false;

    public static readonly MOVE = 4;
    public static readonly BORDER = 4;
    public static readonly CANVAS_SCALE_FACTOR = 2;
    public static readonly WIDTH_STEPS = 96;
    public static readonly HORIZONTAL_PADDING = 10;
    public static readonly SPEED = 350;
    public static readonly TOP_BAR_HEIGHT = 9;
    public static readonly INIT_LENGTH = 3;

    public static readonly GAME_CANVAS_WIDTH = Config.MOVE * 24;
    public static readonly GAME_CANVAS_HEIGHT = Config.MOVE * 14;

    public static readonly CANVAS_WIDTH = Config.GAME_CANVAS_WIDTH;
    public static readonly CANVAS_HEIGHT = Config.GAME_CANVAS_HEIGHT + Config.TOP_BAR_HEIGHT;
    public static readonly BOARD_HEIGHT = Config.GAME_CANVAS_HEIGHT - Config.BORDER;
    public static readonly BOARD_WIDTH = Config.GAME_CANVAS_WIDTH - Config.BORDER;
    public static readonly BOARD = {
        start: {
            x: (Config.BORDER / 2),
            y: (Config.BORDER / 2),
        },
        end: {
            x: (Config.BORDER / 2) + Config.BOARD_WIDTH,
            y: (Config.BORDER / 2) + Config.BOARD_HEIGHT,
        },
    };

    public drawingConfigSnapshot: DrawingConfigInterface;

    constructor(private windowParams$: Observable<WindowParamsModel>) {
    }

    public get drawingConfig$(): Observable<DrawingConfigInterface> {
        return this.windowParams$.pipe(
            map((params) => {
                let pixelSize = 6;

                let horizontalParam;
                if (Config.isMobile && params.isHorizontal) {
                    horizontalParam = params.height;
                } else {
                    horizontalParam = params.width;
                }

                if (horizontalParam - Config.HORIZONTAL_PADDING >= 10 * Config.WIDTH_STEPS / 2) {
                    pixelSize = 10;
                } else if (horizontalParam - Config.HORIZONTAL_PADDING >= 9 * Config.WIDTH_STEPS / 2) {
                    pixelSize = 9;
                } else if (horizontalParam - Config.HORIZONTAL_PADDING >= 8 * Config.WIDTH_STEPS / 2) {
                    pixelSize = 8;
                } else if (horizontalParam - Config.HORIZONTAL_PADDING >= 7 * Config.WIDTH_STEPS / 2) {
                    pixelSize = 7;
                } else {
                    pixelSize = 6;
                }

                const height = pixelSize * Config.CANVAS_HEIGHT;
                const width = pixelSize * Config.CANVAS_WIDTH;
                const config = {
                    pixelSpace: horizontalParam - Config.HORIZONTAL_PADDING >= 288 ? 1 : 0,
                    pixelSize,
                    height,
                    width,
                    widthPx: width / Config.CANVAS_SCALE_FACTOR,
                };

                this.drawingConfigSnapshot = {...config};
                return config;
            }),
        );
    }
}
