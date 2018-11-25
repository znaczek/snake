import {Canvas} from '../../common/canvas';
import {Snake} from './snake';
import * as config from '../../../config';
import {MealFactory} from './factory/meal.factory';
import {Apple} from './model/apple.model';
import {Observable, Subject} from 'rxjs/index';
import {takeWhile} from 'rxjs/operators';
import {TextWriter} from '../../common/text-writer';
import {Bug} from './model/bug.model';
import {charData} from '../../common/data/char.data';
import {Position} from '../../common/model/position.model';
import {Pixel} from '../../common/model/pixel.model';
import {ColorsEnum} from '../../common/enums/color.enums';
import {getGameBoarderPixels, getGameBoardOffset, getMaskPixels} from './utils/utils';
import {AppEvent} from '../../common/model/game-event.model';
import {ClicksEnum} from '../../common/enums/clicks.enum';

export class Game {
    private snake: Snake;
    private gameOn: boolean;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;

    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<ClicksEnum>,
                private textWriter: TextWriter,
                private mealFactory: MealFactory,
                ) {
        this.snake = new Snake(this.canvas);
        this.textWriter.setCharData(charData);
    }

    public start(): Game {
        this.canvas.clear();
        this.provideApple();
        this.bindEvents();
        this.loop();
        this.draw();

        this.gameOn = true;
        return this;
    }

    private bindEvents(): void {
        this.onClick.pipe(takeWhile(() => this.gameOn))
            .subscribe((event) => {
                if (!this.gameOn) {
                    return;
                }
                switch (event) {
                    case ClicksEnum.LEFT:
                        this.snake.turnLeft();
                        this.testMove();
                        break;
                    case ClicksEnum.RIGHT:
                        this.snake.turnRight();
                        this.testMove();
                        break;
                    case ClicksEnum.UP:
                        this.snake.turnUp();
                        this.testMove();
                        break;
                    case ClicksEnum.DOWN:
                        this.snake.turnDown();
                        this.testMove();
                        break;
                    case ClicksEnum.ENTER:
                        if (this.interval) {
                            clearTimeout(this.interval);
                            this.interval = null;
                        } else {
                            this.loop();
                        }
                        break;
                }
            });
    }

    private provideApple(): void {
        if (!this.apple) {
            this.apple = this.mealFactory.generateApple(this.getForbiddenPixelsForApple());
            return;
        }
    }

    private getForbiddenPixelsForApple(): Pixel[] {
        return this.snake.getBodyBoundaryPixels().concat(this.bug ? this.bug.getBoundary().getPixels() : []);
    }

    private getForbiddenPixelsForBug(): Pixel[] {
        return this.snake.getBodyBoundaryPixels().concat(this.apple.getBoundary().getPixels());
    }

    private hasCollision(): boolean {
        return this.snake.checkSelfCollision();
    }

    private endGame(): void {
        this.gameOn = false;
        setTimeout(() => {
            this.stageHandler.next(AppEvent.endGame(this.points));
        }, 1000);

        // TODO
    }

    private testMove(): void {
        this.handleMove();
    }

    private draw() {
        const gameBoardPixels: Pixel[] = [];
        const absolutePixels: Pixel[] = [];

        gameBoardPixels.push(...this.snake.getPixels({
                additionalPixelsSets: this.bug ?
                [this.apple.getPixels(), this.bug.getPixels()] :
                [this.apple.getPixels()],
            },
        ));
        gameBoardPixels.push(...this.apple.getPixels());
        absolutePixels.push(...this.textWriter.write(
            TextWriter.padStart(this.points.toString(), '0', 4), new Position(1, 1),
        ).getPixels());

        if (this.bug) {
            gameBoardPixels.push(...this.bug.getPixels());
            const bugPointsLeftText = this.textWriter.write(TextWriter.padStart(this.bug.value.toString(), '0', 2));
            const xBugPointsOffset = config.CANVAS_WIDTH - (2 * charData[0].width);
            const xBugOffset = xBugPointsOffset - 2 - Bug.width;
            absolutePixels.push(...this.bug.getPixels({
                offset: new Position(xBugOffset, 2),
            }));
            absolutePixels.push(...bugPointsLeftText.getPixels({
                offset: new Position(xBugPointsOffset, 1),
            }));
        }
        absolutePixels.push(...getGameBoarderPixels());

        this.canvas.prepareBoard();
        this.canvas.drawPixels(gameBoardPixels, getGameBoardOffset());
        this.canvas.drawPixels(absolutePixels);
        this.canvas.drawPixels(getMaskPixels(), new Position(0, 0), config.DEBUG ? ColorsEnum.RED : ColorsEnum.GREEN);
    }

    private loop(): void {
        // this.handleMove();
        this.interval = setTimeout(this.loop.bind(this), config.SPEED);
    }

    private handleMove(): void {
        this.snake.move();
        if (!this.hasCollision()) {
            this.provideApple();
            this.refreshBug();
            this.handleEating();
            this.snake.handleMoveEnd();
            this.draw();
        } else {
            this.endGame();
        }
    }

    private handleEating(): void {
        if (this.snake.didEat(this.apple)) {
            this.snake.grow();
            this.apple = this.mealFactory.generateApple(this.getForbiddenPixelsForApple());
            this.handleBugGeneration();
            this.points += 1;
        } else if (this.snake.didEat(this.bug)) {
            this.snake.grow();
            this.points += this.bug.value;
            this.bug = null;
            this.handleBugGeneration();
        }
    }

    private handleBugGeneration(): void {
        if (!this.bug && (Math.random() * 100 > 0)) {
            this.bug = this.mealFactory.generateBug(this.getForbiddenPixelsForBug());
        }
    }

    private refreshBug(): void {
        if (!this.bug) {
            return;
        }
        this.bug.value -= 1;
        if (this.bug.value === 0) {
            this.bug = null;
        }
    }
}
