import {Config} from '../../../config';
import {Pixel} from '../model/pixel.model';
import {COLORS} from '../common.constants';
import {Position} from '../model/position.model';
import {combineLatest, Subject} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {DrawingConfigInterface} from '../interfaces/drawing-config.interface';
import {ColorsEnum} from '../enums/color.enums';
import {Injectable} from '../di/injectable';

@Injectable
export class Canvas {
    private ctx: CanvasRenderingContext2D = null;
    private drawer$: Subject<Pixel[]>;

    constructor(private config: Config,
                private canvas: HTMLCanvasElement) {
        if (this.ctx !== null) {
            throw new Error('Canvas element is already set');
        }

        this.ctx = this.canvas.getContext('2d');

        this.drawer$ = new Subject();
        combineLatest(
            this.config.drawingConfig$.pipe(
                tap((drawingConfig) => {
                    this.setCanvasParams(drawingConfig);
                })),
            this.drawer$,
        ).subscribe(([drawingConfig, pixels]) => {
            this._clear(drawingConfig);
            this._drawPixels(pixels, drawingConfig);
        });
    }

    public clear(): void {
        this.drawer$.next([]);
    }

    public drawPixels(pixels: Pixel[], offset: Position = new Position(0, 0)): void {
        this.drawer$.next(pixels.map((pixel: Pixel) => new Pixel(pixel.x + offset.x, pixel.y + offset.y, pixel.color)));
        if (Config.DEBUG_CANVAS) {
            this.drawGrid();
        }
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    private setCanvasParams(config: DrawingConfigInterface) {
        this.canvas.width = config.width;
        this.canvas.height = config.height;
        this.canvas.style.display = 'block';
        this.canvas.style.width = config.widthPx + 'px';
    }

    private drawPixel(pixel: Pixel, config: DrawingConfigInterface): void {
        this.ctx.fillStyle = COLORS[pixel.color];
        this.ctx.fillRect(
            pixel.x * config.pixelSize,
            pixel.y * config.pixelSize,
            config.pixelSize - config.pixelSpace,
            config.pixelSize - config.pixelSpace,
        );
    }

    private _drawPixels(pixels: Pixel[], config: DrawingConfigInterface) {
        this.ctx.save();
        if (pixels.length === 0) {
            this._clear(config);
        } else {
            pixels.forEach((pixel: Pixel) => this.drawPixel(pixel, config));
        }
        this.ctx.restore();
    }

    private _clear(config: DrawingConfigInterface): void {
        this.ctx.clearRect(0, 0, config.width, config.height);
    }

    private drawGrid(): void {
        this.ctx.save();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = COLORS[ColorsEnum.BLACK];
        for (let i = 0; i < Config.CANVAS_HEIGHT; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.config.drawingConfigSnapshot.pixelSize);
            this.ctx.lineTo(Config.CANVAS_WIDTH * this.config.drawingConfigSnapshot.pixelSize, i * this.config.drawingConfigSnapshot.pixelSize);
            this.ctx.stroke();
        }
        for (let i = 0; i < Config.CANVAS_WIDTH; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.config.drawingConfigSnapshot.pixelSize, 0);
            this.ctx.lineTo(i * this.config.drawingConfigSnapshot.pixelSize, Config.CANVAS_HEIGHT * this.config.drawingConfigSnapshot.pixelSize);
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

}
