import * as config from '../config';
import {drawData} from './data/draw.data';
import {COLORS} from '../config';
import {DirectionEnum} from './enums/direction.enum';
import {Position} from './model/position.model';
import {BodyPart} from './model/body-part.model';
import {BodyPartEnum} from './enums/body-part.enum';
import {Pixel} from './model/pixel.model';
import {Apple} from './model/apple.model';
import {bugData} from './data/bug.data';
import {Bug} from './model/bug.model';

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

    public drawMask(): void {
        this.ctx.save();
        if (!config.DEBUG) {
            this.ctx.strokeStyle = COLORS.GREEN;
        } else {
            this.ctx.strokeStyle = COLORS.RED;
            this.drawGrid();
        }

        this.ctx.lineWidth = config.PIXEL_SIZE;
        this.ctx.strokeRect(
            1.5 * config.PIXEL_SIZE,
            (1.5 + config.TOP_BAR_HEIGHT) * config.PIXEL_SIZE,
            config.GAME_CANVAS_WIDTH_PX - 3 * config.PIXEL_SIZE,
            config.GAME_CANVAS_HEIGHT_PX - 3 * config.PIXEL_SIZE,
        );
        this.ctx.restore();
    }

    public prepareBoard(): void {
        this.clear();
        this.drawGameBorder();
    }

    public handleBounrady(position: Position, direction: DirectionEnum): void {
        if (direction === DirectionEnum.RIGHT && position.x + 5 > config.BOARD.end.x) {
            position.x -= (config.BOARD_WIDTH + 2);
        }
        if (direction === DirectionEnum.LEFT && position.x - 5 < 0) {
            position.x += (config.BOARD_WIDTH + 2);
        }
        if (direction === DirectionEnum.DOWN && position.y + 5 > config.BOARD.end.y) {
            position.y -= (config.BOARD_HEIGHT + 2);
        }
        if (direction === DirectionEnum.UP && position.y - 5 < 0) {
            position.y += (config.BOARD_HEIGHT + 2);
        }
    }

    public drawPart(
        part: BodyPart,
        prevPart: BodyPart = null,
        nextPart: BodyPart = null,
        isCopy: boolean = false,
    ): void {
        let points: Pixel[] ;
        let doesPartProtrude: boolean = false;
        if (!nextPart) {
            nextPart = part;
        }
        if (!prevPart) {
            prevPart = part;
        }

        switch (part.type) {
            case BodyPartEnum.HEAD:
                points = drawData.head[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.BODY:
                points = drawData.body[part.direction][prevPart.direction][nextPart.direction];
                break;
            case BodyPartEnum.TAIL:
                points = drawData.tail[part.direction][prevPart.direction][nextPart.direction];
                break;
        }

        for (const pixel of points) {
            const bodyPixel = new Pixel(part.position.x + pixel.x, part.position.y + pixel.y);
            this.drawGamePixel(bodyPixel);
            if (this.doesPixelProtrude(bodyPixel)) {
                doesPartProtrude = true;
            }
        }

        if (doesPartProtrude && !isCopy) {
            this.clonePartTrail(part, prevPart, nextPart);
        }
    }

    public drawApple(apple: Apple): void {
        this.drawGamePixel(new Pixel(apple.x + 1, apple.y));
        this.drawGamePixel(new Pixel(apple.x , apple.y + 1));
        this.drawGamePixel(new Pixel(apple.x + 2, apple.y + 1));
        this.drawGamePixel(new Pixel(apple.x +1, apple.y + 2));
    }

    public drawBug(bug: Bug): void {
        if (!bug) {
            return;
        }

        bug.getPixels().forEach((pixel: Pixel) => {
            this.drawGamePixel(new Pixel(
                bug.x + pixel.x,
                bug.y + pixel.y,
            ));
        });
    }

    public drawPixel(pixel: Pixel): void {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(
            pixel.x * config.PIXEL_SIZE,
            pixel.y * config.PIXEL_SIZE,
            config.PIXEL_SIZE -1 ,
            config.PIXEL_SIZE -1,
        );
    }

    public drawPixels(pixels: Pixel[], start: Position): void {
        pixels.forEach((pixel: Pixel) => this.drawPixel(
            new Pixel(
                start.x + pixel.x,
                start.y + pixel.y,
            ),
        ));
    }

    private doesPixelProtrude(position: Position): boolean {
        return position.x < 0 || position.x > config.BOARD_WIDTH || position.y < 0 || position.y > config.BOARD_HEIGHT;
    }

    private drawGameBorder(): void {
        for (let i = 0; i < config.GAME_CANVAS_HEIGHT; i+=1) {
            this.drawGamePixel(new Pixel(0 - 2, i - 2));
            this.drawGamePixel(new Pixel(config.GAME_CANVAS_WIDTH - 3, i -2));
        }
        for (let i = 0; i < config.GAME_CANVAS_WIDTH; i+=1) {
            this.drawGamePixel(new Pixel(i - 2, 0 - 4));
            this.drawGamePixel(new Pixel(i - 2, 0 - 2));
            this.drawGamePixel(new Pixel(i - 2, config.GAME_CANVAS_HEIGHT - 3));
        }
    }

    private drawGrid(): void {
        this.ctx.save();
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = COLORS.BLACK;
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

    private clonePartTrail(part: BodyPart, prevPart: BodyPart, nextPart: BodyPart): void {
        const copy = new BodyPart(
            part.type,
            new Pixel(part.position.x, part.position.y),
            part.direction,
        );

        switch (copy.direction) {
            case DirectionEnum.RIGHT:
                copy.position.x += (config.BOARD_WIDTH + 2);
                break;
            case DirectionEnum.LEFT:
                copy.position.x -= (config.BOARD_WIDTH + 2);
                break;
            case DirectionEnum.UP:
                copy.position.y -= (config.BOARD_HEIGHT + 2);
                break;
            case DirectionEnum.DOWN:
                copy.position.y += (config.BOARD_HEIGHT + 2);
                break;
        }
        this.drawPart(copy, prevPart, nextPart, true);
    }

    private drawGamePixel(pixel: Pixel): void {
        const gamePixel = new Pixel(
            pixel.x + config.BOARD.start.x,
            pixel.y + config.BOARD.start.y + config.TOP_BAR_HEIGHT,
            // pixel.y + config.BOARD.start.y,
        );

        this.drawPixel(gamePixel);
    }

}
