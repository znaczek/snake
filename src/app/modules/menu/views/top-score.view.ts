import {Canvas} from '../../../common/services/canvas';
import {TextWriter} from '../../../common/services/text-writer';
import {Subject, timer} from 'rxjs/index';
import {AppState} from '../../../common/app-state';
import {Position} from '../../../common/model/position.model';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {textLargeData} from '../../../common/data/text-large.data';
import {Pixel} from '../../../common/model/pixel.model';
import {Config} from '../../../../config';
import {AnimationDataInterface} from '../interfaces/animation-data.interface';
import {animationData} from '../data/animation.data';
import {takeUntil} from 'rxjs/internal/operators';
import {ClickHandler} from '../../../common/services/click-handler';
import {Injectable} from '../../../common/di/injectable';
import {StageEvent} from '../../../common/model/StageEvents';
import {StageHandler} from '../../../common/services/stage-handler';
import {MainMenu, MainMenuKeysEnum} from './main-menu.view';
import {AbstractView} from '../../../common/views/abstract.view';

@Injectable
export class TopScoreView extends AbstractView {
    private static readonly TITLE = 'Top score:';
    private static STAR_WIDTH = 5;
    private static STAR_HEIGHT = 4;
    private static ANIMATION_TIME = 150;

    private timer: number;
    private unsubscribe$: Subject<void> = new Subject();

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private clickHandler: ClickHandler,
                private stageHandler: StageHandler) {
        super();
    }

    public start(): void {
        this.clickHandler.onClick$.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
            if (event === ClicksEnum.ENTER || event === ClicksEnum.ESCAPE) {
                clearTimeout(this.timer);
                this.stageHandler.next(new StageEvent(MainMenu, MainMenuKeysEnum.TOP_SCORE));
            }
        });
        timer(0, TopScoreView.ANIMATION_TIME).pipe(takeUntil(this.unsubscribe$)).subscribe((i) => {
            this.drawFrame(i < 9 ? i : (i - 8) % 2 + 9);
        });
    }

    public close() {
        this.unsubscribe$.next();
    }

    private drawFrame(counter: number = 0) {
        const pixels: Pixel[] = [];
        const topScore = AppState.getTopScore();

        this.textWriter.setCharData(textLargeData);
        pixels.push(...this.textWriter.write(TopScoreView.TITLE).getPixels({
            offset: new Position(2, 5),
        }));
        pixels.push(...this.textWriter.write(topScore.toString()).getPixels({
            offset: new Position(2, 20),
        }));
        pixels.push(...this.getAnimationPixels(counter, new Position(Config.CANVAS_WIDTH - 4 * TopScoreView.STAR_WIDTH, 1)));

        this.canvas.drawPixels(pixels);
    }

    private getAnimationPixels(counter: number, offset: Position): Pixel[] {
        const data = animationData[counter];
        if (!data) {
            return;
        }
        return data.reduce((acc: Pixel[], curr: AnimationDataInterface) => {
            return [...acc, ...this.getStarPixels(
                new Position(
                    curr.position.x * TopScoreView.STAR_WIDTH + offset.x,
                    curr.position.y * TopScoreView.STAR_HEIGHT + offset.y,
                ),
                curr.filled,
            )];
        }, []);
    }

    private getStarPixels(position: Position, filled: boolean = true): Pixel[] {
        const pixels = [
            new Pixel(position.x, position.y + 1),
            new Pixel(position.x + 1, position.y), new Pixel(position.x + 1, position.y + 2),
            new Pixel(position.x + 2, position.y), new Pixel(position.x + 2, position.y + 2),
            new Pixel(position.x + 3, position.y + 1),
        ];
        if (filled) {
            pixels.push(
                new Pixel(position.x + 1, position.y + 1),
                new Pixel(position.x + 2, position.y + 1),
            );
        }
        return pixels;
    }

}
