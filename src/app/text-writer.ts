import {Position} from './model/position.model';
import {Canvas} from './canvas';
import {charData} from './data/char.data';
import {Pixel} from './model/pixel.model';
import {Char} from './model/char';

export class TextWriter {
    private position: Position;

    public static padStart(text: string, char: string, amount: number): string {
        const amountToPad = amount - text.length;
        if (amountToPad <= 0) {
            return text;
        }
        const prefix: string = new Array(amountToPad + 1).join(char.toString());
        return prefix + text;
    }

    public write(text: string): Pixel[] {
        this.position = new Position(0, 0);
        return text.split('').reduce((acc: Pixel[], currChar: string) => {
            return [...acc, ...this.writeChar(currChar)];
        }, []);
    }

    private writeChar(charIndex: string): Pixel[] {
        if (charIndex.length !== 1) {
            throw new Error('Bad input character: ' + charIndex);
        }
        const char: Char = charData[charIndex];
        if (!char) {
            return;
        }

        const pixels: Pixel[] = [];
        char.pixels.forEach((pixel: Pixel) => {
            const p = new Pixel(
                this.position.x + pixel.x,
                this.position.y + pixel.y,
            );
            pixels.push(p);
        });
        this.position.x += char.width;
        return pixels;
    }
}
