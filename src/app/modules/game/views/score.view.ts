import {CustomViewInterface} from '../../../common/interfaces/custom-view.interface';
import {Canvas} from '../../../common/canvas';
import {TextWriter} from '../../../common/text-writer';
import {Position} from '../../../common/model/position.model';
import {textLargeData} from '../../../common/data/text-large.data';
import {Subject} from 'rxjs/index';

export class ScoreView implements CustomViewInterface {
    private static readonly GAME_OVER = 'Game over!';
    private static readonly YOUR_SCORE = 'Your score:';

    public exit: Subject<void> = new Subject();

    constructor(private canvas: Canvas,
                private textWriter: TextWriter) {
        this.textWriter.setCharData(textLargeData);
        setTimeout(() => {
            // this.exit.next();
        }, 1000);
    }

    public draw(): void {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.textWriter.write(ScoreView.GAME_OVER).getPixels({
            offset: new Position(2, 3),
        }));
        this.canvas.drawPixels(this.textWriter.write(ScoreView.YOUR_SCORE).getPixels({
            offset: new Position(2, 18),
        }));
        this.canvas.drawPixels(this.textWriter.write('1234567890').getPixels({
            offset: new Position(2, 33),
        }));
    }
}
