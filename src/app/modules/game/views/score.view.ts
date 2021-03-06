import {Canvas} from '../../../common/services/canvas';
import {TextWriter} from '../../../common/services/text-writer';
import {Position} from '../../../common/model/position.model';
import {textLargeData} from '../../../common/data/text-large.data';
import {merge, timer} from 'rxjs/index';
import {first} from 'rxjs/internal/operators';
import {ClickHandler} from '../../../common/services/click-handler';
import {Injectable} from '../../../common/di/injectable';
import {StageHandler} from '../../../common/services/stage-handler';
import {StageEvent} from '../../../common/model/StageEvents';
import {MainMenu} from '../../menu/views/main-menu.view';
import {AbstractView} from '../../../common/views/abstract.view';

@Injectable
export class ScoreView extends AbstractView {
    private static readonly GAME_OVER = 'Game over!';
    private static readonly YOUR_SCORE = 'Your score:';

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private clickHandler: ClickHandler,
                private stageHandler: StageHandler) {
        super();
    }

    public start(points: number): void {
        this.textWriter.setCharData(textLargeData);

        merge(
            this.clickHandler.onClick$,
            timer(3000),
        ).pipe(first()).subscribe(() => this.end());

        this.canvas.drawPixels([
            ...this.textWriter.write(ScoreView.GAME_OVER).getPixels({offset: new Position(2, 3)}),
            ...this.textWriter.write(points.toString()).getPixels({offset: new Position(2, 33)}),
            ...this.textWriter.write(ScoreView.YOUR_SCORE).getPixels({offset: new Position(2, 18)}),
        ]);
    }

    public close() {}

    private end() {
        this.stageHandler.next(new StageEvent(MainMenu));
    }

}
