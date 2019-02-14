import {Subject} from 'rxjs/index';
import {Canvas} from '../../../common/services/canvas';
import {TextWriter} from '../../../common/services/text-writer';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {Pixel} from '../../../common/model/pixel.model';
import {takeUntil} from 'rxjs/internal/operators';
import {Position} from '../../../common/model/position.model';
import {Config} from '../../../../config';
import {AppState} from '../../../common/app-state';
import {Snake} from '../../game/model/snake';
import {ColorsEnum} from '../../../common/enums/color.enums';
import {ClickHandler} from '../../../common/services/click-handler';
import {Injectable} from '../../../common/di/injectable';
import {DrawingService} from '../service/drawing.service';
import {AbstractView} from '../../../common/views/abstract.view';
import {StageHandler} from '../../../common/services/stage-handler';
import {StageEvent} from '../../../common/model/StageEvents';
import {MainMenu, MainMenuKeysEnum} from './main-menu.view';

@Injectable
export class LevelView extends AbstractView {
    private static readonly NAME = 'LEVEL';
    private static readonly SNAKE_POSITION = new Position(44, 52);

    private level: number = AppState.getLevel();
    private snake: Snake;
    private loopTick: number;
    private interval: number;
    private unsubscribe$: Subject<void> = new Subject();

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private clickHandler: ClickHandler,
                private drawingService: DrawingService,
                private stageHandler: StageHandler) {
        super();
    }

    public start() {
        this.snake = new Snake(LevelView.SNAKE_POSITION);
        this.loopTick = Config.SPEED / this.level;
        this.clickHandler.onClick$.pipe(takeUntil(this.unsubscribe$))
            .subscribe((event) => {
                switch (event) {
                    case ClicksEnum.LEFT:
                        this.level = Math.max(this.level - 1, 1);
                        this.draw();
                        break;
                    case ClicksEnum.RIGHT:
                        this.level = Math.min(this.level + 1, 9);
                        this.draw();
                        break;
                    case ClicksEnum.ESCAPE:
                        this.stageHandler.next(new StageEvent(MainMenu, MainMenuKeysEnum.LEVEL));
                        return;
                    case ClicksEnum.ENTER:
                        AppState.setLevel(this.level);
                        this.stageHandler.next(new StageEvent(MainMenu, MainMenuKeysEnum.LEVEL));
                        return;
                }
                this.loopTick = Config.SPEED / this.level;
            });
        this.loop();
    }

    public close() {
        this.unsubscribe$.next();
        clearInterval(this.interval);
    }

    public draw() {
        const pixels: Pixel[] = [];
        for (let i = 1; i <= 9; i += 1) {
            pixels.push(...this.getBarPixels(i, i <= this.level));
        }
        pixels.push(...this.drawingService.drawMenuHeader(LevelView.NAME));
        pixels.push(...this.snake.getPixels());
        pixels.push(...this.getMaskPixels());
        this.canvas.drawPixels(pixels);
    }

    private getBarPixels(level: number, filled = false): Pixel[] {
        const pixels: Pixel[] = [];
        const offset = new Position((level - 1) * 10 + 5, (10 - level) * 3 + Config.TOP_BAR_HEIGHT);
        const height = (level * 3);
        if (filled) {
            for (let y = 0; y < height; y += 1) {
                pixels.push(new Pixel(offset.x, offset.y + y));
            }
        }

        for (let x = 0; x < 3; x += 1) {
            if (filled) {
                for (let y = 0; y < height; y += 1) {
                    pixels.push(new Pixel(offset.x + x + 1, offset.y + y));
                }
            }
            pixels.push(new Pixel(offset.x + x + 1, offset.y + height + 1));
        }
        pixels.push(new Pixel(offset.x + 4, offset.y + height + 1));

        for (let y = 1; y < height + 2; y += 1) {
            pixels.push(new Pixel(offset.x + 5, offset.y + y));
        }
        return pixels;
    }

    private getMaskPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        for (let y = LevelView.SNAKE_POSITION.y; y < LevelView.SNAKE_POSITION.y + 6; y += 1) {
            pixels.push(new Pixel(0, y - 3));
            pixels.push(new Pixel(1, y - 3, ColorsEnum.GREEN));
            pixels.push(new Pixel(Config.CANVAS_WIDTH - 2, y - 3, ColorsEnum.GREEN));
            pixels.push(new Pixel(Config.CANVAS_WIDTH - 1, y - 3));
        }
        return pixels;
    }

    private loop(): void {
        this.snake.move();
        this.snake.handleMoveEnd();
        this.interval = setTimeout(this.loop.bind(this), this.loopTick);
        this.draw();
    }
}
