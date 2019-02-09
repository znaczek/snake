import {CustomViewInterface} from '../../../../common/interfaces/custom-view.interface';
import {Observable, Subject} from 'rxjs/index';
import {Canvas} from '../../../../common/canvas';
import {TextWriter} from '../../../../common/text-writer';
import {ClicksEnum} from '../../../../common/enums/clicks.enum';
import {Pixel} from '../../../../common/model/pixel.model';
import {takeUntil} from 'rxjs/internal/operators';
import {DrawingUtils} from '../../utils/drawing.utils';
import {Position} from '../../../../common/model/position.model';
import {Config} from '../../../../../Config';
import {AppState} from '../../../../common/app-state';
import {Snake} from '../../../game/snake';
import {ColorsEnum} from '../../../../common/enums/color.enums';
import {ClickObservable} from '../../../../common/observables/click-observable';
import {Injectable} from '../../../../common/di/injectable';

@Injectable
export class LevelView implements CustomViewInterface {
    private static readonly NAME = 'LEVEL';
    private static readonly SNAKE_POSITION = new Position(44, 52);
    public exit$: Subject<void> = new Subject();

    private level: number = AppState.getLevel();
    private snake: Snake;
    private loopTick: number;
    private interval: number;

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private onClick$: ClickObservable<ClicksEnum>,
                private drawingUtils: DrawingUtils) {
        this.snake = new Snake(LevelView.SNAKE_POSITION);
        this.loopTick = Config.SPEED / this.level;
        this.onClick$.pipe(takeUntil(this.exit$))
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
                        clearInterval(this.interval);
                        this.exit$.next();
                        return;
                    case ClicksEnum.ENTER:
                        clearInterval(this.interval);
                        AppState.setLevel(this.level);
                        this.exit$.next();
                        return;
                }
                this.loopTick = Config.SPEED / this.level;
            });
        this.loop();
    }

    public draw() {
        this.canvas.clear();
        const pixels: Pixel[] = [];
        for (let i = 1; i <= 9; i += 1) {
            pixels.push(...this.getBarPixels(i, i <= this.level));
        }
        pixels.push(...this.drawingUtils.drawMenuHeader(LevelView.NAME));
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
