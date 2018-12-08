import {fromEvent} from 'rxjs/index';
import {Pixel} from './model/pixel.model';
import {Canvas} from './canvas';
import {Config} from '../../Config';
import {mergeMap, takeUntil, tap} from 'rxjs/internal/operators';
import {ColorsEnum} from './enums/color.enums';
import {Position} from './model/position.model';

declare global {
    interface Window {
        printPixels: any;
        clearBoard: any;
        toggle: any;
    }
}

export class Blackboard {
    private pixels: Pixel[] = [];
    private lastPosition: Position = new Position(0 ,0);
    private toggle = true;

    constructor(private canvas: Canvas, pixels: Pixel[] = []) {
        this.pixels = pixels;
        const move$ = fromEvent(document, 'mousemove');
        const down$ = fromEvent(document, 'mousedown');
        const up$ = fromEvent(document, 'mouseup');
        const contextmenu$ = fromEvent(document, 'contextmenu').subscribe((e: MouseEvent) => e.preventDefault());
        down$.pipe(
            tap((event: MouseEvent) => {
                event.preventDefault();
                return this.drawPixel(event, event.which);
            }),
            mergeMap((event: MouseEvent) => {
                event.preventDefault();
                return move$.pipe(takeUntil(up$));
            }),
        ).subscribe((event: MouseEvent) => {
            event.preventDefault();
            this.drawPixel(event, event.which);
        });

        window.printPixels = () => {
            const pixelsToDraw = this.pixels
                .filter((pixel) => pixel.x >= 0 && pixel.y >= 0)
                .sort((a, b) => {
                    if (a.x === b.x) {
                        return a.y-b.y;
                    }
                    return a.x-b.x;
                });
            /* tslint:disable:no-console */
            console.log(JSON.stringify(pixelsToDraw));
            /* tslint:enable:no-console */
        };
        window.toggle = () => {
            if (this.toggle) {
                this.canvas.clear();
            } else {
                this.draw();
            }
            this.toggle = !this.toggle;
        };

        this.draw();
    }

    private drawPixel(e: MouseEvent, type: number): void {
        const newPixel = new Pixel(
            Math.round(this.getX(e) / Config.PIXEL_SIZE),
            Math.round(this.getY(e) / Config.PIXEL_SIZE),
            ColorsEnum.RED,
        );

        if (this.lastPosition.x === newPixel.x && this.lastPosition.y === newPixel.y) {
            return;
        }

        this.lastPosition = new Position(newPixel.x, newPixel.y);
        const existingPixelIndex = this.pixels.findIndex((pixel: Pixel) => {
            return pixel.x === newPixel.x && pixel.y === newPixel.y;
        });

        if (existingPixelIndex > -1) {
            if (type === 3) {
                this.pixels.splice(existingPixelIndex, 1);
            }
        } else {
            if (type === 1) {
                this.pixels.push(newPixel);
            }
        }

        this.draw();
    }

    private getCavnas(): HTMLCanvasElement {
        return document.querySelector('canvas');
    }

    private getCanvasBoundary(): DOMRectInit {
        return this.getCavnas().getBoundingClientRect();
    }

    private getX(e: MouseEvent): number {
        return e.x - this.getCanvasBoundary().x;
    }

    private getY(e: MouseEvent): number {
        return e.y - this.getCanvasBoundary().y;
    }

    private draw() {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.pixels);
    }

}
