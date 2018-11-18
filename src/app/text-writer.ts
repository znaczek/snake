import {Position} from './model/position.model';
import {Canvas} from './canvas';
import {charData} from './data/charData';
import {Pixel} from './model/pixel.model';
import {Char} from './model/char';

export class TextWriter {
    public static padStart(text: string, char: string, amount: number): string {
        const amountToPad = amount - text.length;
        if (amountToPad <= 0) {
            return text;
        }
        console.log(amountToPad);
        const prefix: string = new Array(amountToPad + 1).join(char.toString());
        console.log(prefix);
        return prefix + text;
    }

    private position: Position = new Position(0, 0);

    constructor(private canvas: Canvas) {
    }

    public setPosition(position: Position): void {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    public write(text: string): void {
        console.log(text);
        text.split('').forEach((char) => this.writeChar(char));
    }

    private writeChar(charIndex: string): void {
        if (charIndex.length !== 1) {
            throw new Error('Bad input character: ' + charIndex);
        }
        const char: Char = charData[charIndex];
        if (!char) {
            return;
        }

        char.pixels.forEach((pixel: Pixel) => {
            const p = new Pixel(
                this.position.x + pixel.x,
                this.position.y + pixel.y,
            );
            this.canvas.drawPixel(p);
        });
        this.position.x += char.width;
    }
}
