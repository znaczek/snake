import * as config from '../../config';
import {Pixel} from './model/pixel.model';
import {COLORS} from './constants/color.constants';
import {ColorsEnum} from './enums/color.enums';

export class Canvas {
    private ctx: CanvasRenderingContext2D = null;

    constructor(private canvas: HTMLCanvasElement) {}

    public init(): void {
        if (this.ctx !== null) {
            throw new Error('Canvas element is already set');
        }
        this.canvas.width = config.CANVAS_WIDTH_PX;
        this.canvas.height = config.CANVAS_HEIGHT_PX;
        this.canvas.style.display = 'block';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(1, 1);
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, config.CANVAS_WIDTH_PX, config.CANVAS_HEIGHT_PX);
    }

    public prepareBoard(): void {
        this.clear();
        if (config.DEBUG) {
            this.drawGrid();
        }
    }

    public drawPixels(pixels: Pixel[], color: ColorsEnum = ColorsEnum.BLACK): void {
        this.ctx.save();
        this.ctx.fillStyle = COLORS[color];
        pixels.forEach((pixel: Pixel) => this.drawPixel(
            new Pixel(pixel.x, pixel.y),
        ));
        this.ctx.restore();
    }

    public drawGamePixels(pixels: Pixel[], color: ColorsEnum = ColorsEnum.BLACK): void {
        this.ctx.save();
        this.ctx.fillStyle = COLORS[color];
        pixels.forEach((pixel: Pixel) => this.drawGamePixel(
            new Pixel(pixel.x, pixel.y),
        ));
        this.ctx.restore();
    }

    private drawGamePixel(pixel: Pixel): void {
        const gamePixel = new Pixel(
            pixel.x + config.BOARD.start.x,
            pixel.y + config.BOARD.start.y + config.TOP_BAR_HEIGHT,
        );

        this.drawPixel(gamePixel);
    }

    private drawPixel(pixel: Pixel): void {
        this.ctx.fillRect(
            pixel.x * config.PIXEL_SIZE,
            pixel.y * config.PIXEL_SIZE,
            config.PIXEL_SIZE -1 ,
            config.PIXEL_SIZE -1,
        );
    }

    private drawGrid(): void {
        this.ctx.save();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = COLORS[ColorsEnum.BLACK];
        for (let i = 0; i < config.GAME_CANVAS_HEIGHT; i+=1) {
            this.ctx.beginPath();
            this.ctx.moveTo(
                0,
                (i + config.TOP_BAR_HEIGHT) * config.PIXEL_SIZE,
            );
            this.ctx.lineTo(
                config.GAME_CANVAS_WIDTH * config.PIXEL_SIZE,
                (i + config.TOP_BAR_HEIGHT) * config.PIXEL_SIZE,
            );
            this.ctx.stroke();
        }
        for (let i = 0; i < config.GAME_CANVAS_WIDTH; i+=1) {
            this.ctx.beginPath();
            this.ctx.moveTo(
                i * config.PIXEL_SIZE,
                (config.TOP_BAR_HEIGHT) * config.PIXEL_SIZE,
            );
            this.ctx.lineTo(
                i * config.PIXEL_SIZE,
                (config.GAME_CANVAS_HEIGHT + config.TOP_BAR_HEIGHT) * config.PIXEL_SIZE,
            );
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

}
