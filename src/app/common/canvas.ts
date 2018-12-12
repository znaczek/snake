import {Config} from '../../Config';
import {Pixel} from './model/pixel.model';
import {COLORS} from './common.constants';
import {ColorsEnum} from './enums/color.enums';
import {Position} from './model/position.model';
import {combineLatest, Subject} from 'rxjs';
import {scan, tap} from 'rxjs/internal/operators';

export class Canvas {
    private ctx: CanvasRenderingContext2D = null;
    private drawer$: Subject<Pixel[]> = new Subject();

    constructor(private canvas: HTMLCanvasElement,
                private config: Config) {
        if (this.ctx !== null) {
            throw new Error('Canvas element is already set');
        }
        this.canvas.width = Config.CANVAS_WIDTH_PX;
        this.canvas.height = Config.CANVAS_HEIGHT_PX;
        this.canvas.style.display = 'block';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(1, 1);
        combineLatest(
            this.config.pixelSpace$.pipe(tap(() => this._clear())),
            this.drawer$.pipe(scan((a, b) => !b ? [] : [...a, ...b], [])),
        ).subscribe(([pixelSpace, pixels]) => {
            this._drawPixels(pixels, pixelSpace);
        });
    }

    public clear(): void {
        this._clear();
        this.drawer$.next();
    }

    public prepareBoard(): void {
        this.clear();
        if (Config.DEBUG_CANVAS) {
            this.drawGrid();
        }
    }

    public drawPixels(pixels: Pixel[], offset: Position = new Position(0, 0)): void {
        this.drawer$.next(pixels.map((pixel: Pixel) => new Pixel(pixel.x + offset.x, pixel.y + offset.y, pixel.color)));
    }

    private drawPixel(pixel: Pixel, pixelSpace: number): void {
        this.ctx.fillStyle = COLORS[pixel.color];
        this.ctx.fillRect(
            pixel.x * Config.PIXEL_SIZE,
            pixel.y * Config.PIXEL_SIZE,
            Config.PIXEL_SIZE - pixelSpace,
            Config.PIXEL_SIZE - pixelSpace,
        );
    }

    private _drawPixels(pixels: Pixel[], pixelSpace: number) {
        this.ctx.save();
        pixels.forEach((pixel: Pixel) => this.drawPixel(pixel, pixelSpace));
        this.ctx.restore();
    }

    private _clear(): void {
        this.ctx.clearRect(0, 0, Config.CANVAS_WIDTH_PX, Config.CANVAS_HEIGHT_PX);
    }

    private drawGrid(): void {
        this.ctx.save();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = COLORS[ColorsEnum.BLACK];
        for (let i = 0; i < Config.CANVAS_HEIGHT; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * Config.PIXEL_SIZE);
            this.ctx.lineTo(Config.CANVAS_WIDTH * Config.PIXEL_SIZE, i * Config.PIXEL_SIZE);
            this.ctx.stroke();
        }
        for (let i = 0; i < Config.CANVAS_WIDTH; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * Config.PIXEL_SIZE, 0);
            this.ctx.lineTo(i * Config.PIXEL_SIZE, Config.CANVAS_HEIGHT * Config.PIXEL_SIZE);
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

}
