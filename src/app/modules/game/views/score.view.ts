import {CustomViewInterface} from '../../../common/interfaces/custom-view.interface';
import {Canvas} from '../../../common/canvas';
import {TextWriter} from '../../../common/text-writer';
import {Position} from '../../../common/model/position.model';
import {textLargeData} from '../../../common/data/text-large.data';
import {Observable, Subject} from 'rxjs/index';
import {ClicksEnum} from '../../../common/enums/clicks.enum';

export class ScoreView implements CustomViewInterface {
    private static readonly GAME_OVER = 'Game over!';
    private static readonly YOUR_SCORE = 'Your score:';

    public exit$: Subject<void> = new Subject();

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private onClick$: Observable<ClicksEnum>) {
        this.textWriter.setCharData(textLargeData);

        const onClickSubscription = this.onClick$.subscribe(() => {
            onClickSubscription.unsubscribe();
            this.exit$.next();
        });
        setTimeout(() => {
            this.exit$.next();
        }, 3000);
    }

    public draw(points: number): void {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.textWriter.write(ScoreView.GAME_OVER).getPixels({
            offset: new Position(2, 3),
        }));
        this.canvas.drawPixels(this.textWriter.write(ScoreView.YOUR_SCORE).getPixels({
            offset: new Position(2, 18),
        }));
        this.canvas.drawPixels(this.textWriter.write(points.toString()).getPixels({
            offset: new Position(2, 33),
        }));
    }
}
