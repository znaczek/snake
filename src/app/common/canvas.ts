import * as config from '../../config';
import {Pixel} from './model/pixel.model';
import {COLORS} from './common.constants';
import {ColorsEnum} from './enums/color.enums';
import {Position} from './model/position.model';

export class Canvas {
    private ctx: CanvasRenderingContext2D = null;

    constructor(private canvas: HTMLCanvasElement) {
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
        if (config.DEBUG_CANVAS) {
            this.drawGrid();
        }
    }

    public drawPixels(pixels: Pixel[], offset: Position = new Position(0, 0), color: ColorsEnum = ColorsEnum.BLACK): void {
        this.ctx.save();
        this.ctx.fillStyle = COLORS[color];
        pixels.forEach((pixel: Pixel) => this.drawPixel(
            new Pixel(pixel.x + offset.x, pixel.y + offset.y, pixel.color),
        ));
        this.ctx.restore();
    }

    private drawPixel(pixel: Pixel): void {
        if (pixel.color !== null) {
            this.ctx.save();
            this.ctx.fillStyle = COLORS[pixel.color];
        }
        this.ctx.fillRect(
            pixel.x * config.PIXEL_SIZE,
            pixel.y * config.PIXEL_SIZE,
            config.PIXEL_SIZE - 1,
            config.PIXEL_SIZE - 1,
        );
        if (pixel.color !== null) {
            this.ctx.restore();
        }
    }

    private drawGrid(): void {
        this.ctx.save();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = COLORS[ColorsEnum.BLACK];
        for (let i = 0; i < config.CANVAS_HEIGHT; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * config.PIXEL_SIZE);
            this.ctx.lineTo(config.CANVAS_WIDTH * config.PIXEL_SIZE, i * config.PIXEL_SIZE);
            this.ctx.stroke();
        }
        for (let i = 0; i < config.CANVAS_WIDTH; i += 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * config.PIXEL_SIZE, 0);
            this.ctx.lineTo(i * config.PIXEL_SIZE, config.CANVAS_HEIGHT * config.PIXEL_SIZE);
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

}
