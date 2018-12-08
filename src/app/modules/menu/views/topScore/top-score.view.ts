import {CustomViewInterface} from '../../../../common/interfaces/custom-view.interface';
import {Canvas} from '../../../../common/canvas';
import {TextWriter} from '../../../../common/text-writer';
import {Observable, Subject} from 'rxjs/index';
import {AppState} from '../../../../common/app-state';
import {Position} from '../../../../common/model/position.model';
import {ClicksEnum} from '../../../../common/enums/clicks.enum';
import {textLargeData} from '../../../../common/data/text-large.data';
import {Pixel} from '../../../../common/model/pixel.model';
import {Config} from '../../../../../Config';
import {AnimationDataInterface} from './animation-data.interface';
import {animationData} from './animation.data';

export class TopScoreView implements CustomViewInterface {
    private static readonly TITLE = 'Top score:';
    private static STAR_WIDTH = 5;
    private static STAR_HEIGHT = 4;

    public exit: Subject<void> = new Subject();
    private timer: number;

    constructor(private canvas: Canvas,
                private textWriter: TextWriter,
                private onClick: Observable<ClicksEnum>) {
        const onClickSubscription = this.onClick.subscribe((event) => {
            if (event === ClicksEnum.ENTER || event === ClicksEnum.ESCAPE) {
                onClickSubscription.unsubscribe();
                clearTimeout(this.timer);
                this.exit.next();
            }
        });
    }

    public draw(): void {
        this.drawFrame();
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

        this.canvas.prepareBoard();
        this.canvas.drawPixels(pixels);

        this.timer = setTimeout(() => {
            if (counter > 9) {
                counter = 8;
            }
            this.drawFrame(counter + 1);
        }, 150);
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
