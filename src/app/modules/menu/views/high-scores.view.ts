import {CustomViewInterface} from '../interfaces/custom-view.interface';
import {Canvas} from '../../../common/canvas';
import {TextWriter} from '../../../common/text-writer';
import {Observable, Subject} from 'rxjs/index';
import {AppState} from '../../../common/app-state';
import {MENU_ITEM_HEIGHT} from '../constants/menu-item.constants';
import {Position} from '../../../common/model/position.model';
import {ClicksEnum} from '../../../common/enums/clicks.enum';

export class HighScoresView implements CustomViewInterface {
    public exit: Subject<void> = new Subject();

    constructor(private canvas: Canvas, private textWriter: TextWriter, private onClick: Observable<ClicksEnum>) {
        const onClickSubscription = this.onClick.subscribe((event) => {
            if (event === ClicksEnum.ENTER) {
                onClickSubscription.unsubscribe();
                this.exit.next();
            }
        });
    }

    public draw(): void {
        this.canvas.prepareBoard();
        const highScores = AppState.getHighScores();
        (highScores || []).forEach((highScore: number, index: number) => {
            const scoreText = this.textWriter.write(`${index + 1}. ${highScore}`);
            const pixels = scoreText.getPixels({
                offset: new Position(0, index * MENU_ITEM_HEIGHT),
            });
            this.canvas.drawPixels(pixels, new Position(2, 1));
        });
    }
}
