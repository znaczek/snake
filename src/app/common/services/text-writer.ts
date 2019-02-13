import {Position} from '../model/position.model';
import {Char} from '../model/char.model';
import {AppText} from '../model/game-text.model';
import {CharDataInterface} from '../interfaces/char-data.interface';
import {Injectable} from '../di/injectable';

@Injectable
export class TextWriter {
    public static padStart(text: string, char: string, amount: number): string {
        const amountToPad = amount - text.length;
        if (amountToPad <= 0) {
            return text;
        }
        const prefix: string = new Array(amountToPad + 1).join(char.toString());
        return prefix + text;
    }

    private position: Position;
    private charData: CharDataInterface;

    public setCharData(charData: CharDataInterface): void {
        this.charData = charData;
    }

    public write(text: string, start?: Position): AppText {
        this.position = start || new Position(0, 0);
        const positions: Position[] = [];
        text.split('').forEach((char: string) => {
            positions.push(...this.writeChar(char));
        });
        return new AppText(positions, this.position.x, text);
    }

    private writeChar(charIndex: string): Position[] {
        if (charIndex.length !== 1) {
            throw new Error('Bad input character: ' + charIndex);
        }

        if (charIndex === ' ') {
            this.position.x += 2;
            return;
        }
        const char: Char = this.charData[charIndex];
        if (!char) {
            return;
        }

        const position: Position[] = [];
        char.positions.forEach((pixel: Position) => {
            const p = new Position(
                this.position.x + pixel.x,
                this.position.y + pixel.y,
            );
            position.push(p);
        });
        this.position.x += char.width;
        return position;
    }
}
