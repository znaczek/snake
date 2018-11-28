import {fromEvent} from 'rxjs/index';
import {Pixel} from './model/pixel.model';
import {Canvas} from './canvas';
import * as config from '../../config';
import {mergeMap, takeUntil, tap} from 'rxjs/internal/operators';

declare global {
    interface Window { printPixels: any; }
}

export class Blackboard {
    private pixels: Pixel[] = [];
    private lastPixel: Pixel = new Pixel(0 ,0);

    constructor(private canvas: Canvas) {

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
            console.log(JSON.stringify(this.pixels));
        };
    }

    private drawPixel(e: MouseEvent, type: number): void {
        const newPixel = new Pixel(
            Math.round(this.getX(e) / config.PIXEL_SIZE),
            Math.round(this.getY(e) / config.PIXEL_SIZE),
        );

        if (this.lastPixel.x === newPixel.x && this.lastPixel.y === newPixel.y) {
            return;
        }

        this.lastPixel = new Pixel(newPixel.x, newPixel.y);
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
