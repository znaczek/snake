import {CustomViewInterface} from '../interfaces/custom-view.interface';
import {Canvas} from '../../../common/canvas';
import {TextWriter} from '../../../common/text-writer';
import {Observable, Subject} from 'rxjs/index';
import {AppState} from '../../../common/app-state';
import {MENU_ITEM_HEIGHT} from '../constants/menu-item.constants';
import {Position} from '../../../common/model/position.model';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {menuCharData} from '../../../common/data/menu-text.data';
import {DrawingUtils} from '../utils/drawing.utils';
import * as config from '../../../../config';
import {ColorsEnum} from '../../../common/enums/color.enums';
import {MAX_HIGHT_SCORES_COUNT} from '../../../common/common.constants';

export class HighScoresView implements CustomViewInterface {
    private static readonly TITLE = 'HIGH SCORES';
    private static readonly BACK = 'Back';

    public exit: Subject<void> = new Subject();

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private onClick: Observable<ClicksEnum>,
                private drawingUtils: DrawingUtils) {
        const onClickSubscription = this.onClick.subscribe((event) => {
            if (event === ClicksEnum.ENTER) {
                onClickSubscription.unsubscribe();
                this.exit.next();
            }
        });
    }

    public draw(): void {
        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.drawingUtils.drawMenuHeader(HighScoresView.TITLE));
        this.textWriter.setCharData(menuCharData);
        const highScores = AppState.getHighScores();
        (highScores || []).forEach((highScore: number, index: number) => {
            const scoreText = this.textWriter.write(`${index + 1}. ${highScore}`);
            const pixels = scoreText.getPixels({
                offset: new Position(0, index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT),
            });
            this.canvas.drawPixels(pixels, new Position(2, 1));
        });
        const backYOffset = (MAX_HIGHT_SCORES_COUNT) * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT
        this.canvas.drawPixels(
            DrawingUtils.getMenuItemBackground((MAX_HIGHT_SCORES_COUNT) * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT),
            undefined,
            ColorsEnum.BLACK,
        );
        this.canvas.drawPixels(this.textWriter.write(HighScoresView.BACK).getPixels(), new Position(2, backYOffset + 1), ColorsEnum.GREEN);
    }
}
