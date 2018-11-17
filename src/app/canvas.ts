import * as config from '../config';
import {drawData} from './data/drawData';
import {COLORS} from '../config';
import {DirectionEnum} from './enums/direction.enum';
import {Position} from './model/position.model';
import {BodyPart} from './model/body-part.model';
import {BodyPartEnum} from './enums/body-part.enum';
import {Pixel} from './model/pixel.model';
import {Apple} from './model/apple.model';

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
        this.ctx.strokeStyle = COLORS.GREEN;
        this.ctx.lineWidth = config.PIXEL_SIZE;
        this.ctx.strokeRect(1.5 * config.PIXEL_SIZE, 1.5
            * config.PIXEL_SIZE, config.CANVAS_WIDTH_PX - 3
            * config.PIXEL_SIZE, config.CANVAS_HEIGHT_PX - 3
            * config.PIXEL_SIZE);
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

    private doesPixelProtrude(position: Position): boolean {
        return position.x < 0 || position.x > config.BOARD_WIDTH || position.y < 0 || position.y > config.BOARD_HEIGHT;
    }

    private drawGameBorder(): void {
        for (let i = 0; i < config.CANVAS_HEIGHT; i+=1) {
            this.drawPixel(new Pixel(0, i));
            this.drawPixel(new Pixel(config.CANVAS_WIDTH - 1, i));
        }
        for (let i = 0; i < config.CANVAS_WIDTH; i+=1) {
            this.drawPixel(new Pixel(i, 0));
            this.drawPixel(new Pixel(i, config.CANVAS_HEIGHT - 1));
        }
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

    private drawPixel(pixel: Pixel): void {
        this.ctx.fillRect(
            pixel.x * config.PIXEL_SIZE,
            pixel.y * config.PIXEL_SIZE,
            config.PIXEL_SIZE -1 ,
            config.PIXEL_SIZE -1,
        );
    }

    private drawGamePixel(pixel: Pixel): void {
        const gamePixel = new Pixel(
            pixel.x + config.BOARD.start.x,
            pixel.y + config.BOARD.start.y,
        );

        if (this.doesPixelProtrude(gamePixel)) {
            this.ctx.fillStyle = COLORS.GREEN;
        }
        this.drawPixel(gamePixel);
    }

}
