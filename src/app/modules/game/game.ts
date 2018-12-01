import {Canvas} from '../../common/canvas';
import {Snake} from './snake';
import * as config from '../../../config';
import {MealFactory} from './factory/meal.factory';
import {Apple} from './model/apple.model';
import {Observable, Subject, Subscription} from 'rxjs/index';
import {TextWriter} from '../../common/text-writer';
import {Bug} from './model/bug.model';
import {textSmallData} from '../../common/data/text-small.data';
import {Position} from '../../common/model/position.model';
import {Pixel} from '../../common/model/pixel.model';
import {ColorsEnum} from '../../common/enums/color.enums';
import {getGameBoarderPixels, getGameBoardOffset, getMaskPixels} from './utils/utils';
import {AppEvent} from '../../common/model/game-event.model';
import {ClicksEnum} from '../../common/enums/clicks.enum';
import {AppState} from '../../common/app-state';
import {ScoreView} from './views/score.view';
import {take} from 'rxjs/internal/operators';
import {GameStateEnum} from './enums/game-state.enum';

export class Game {
    private snake: Snake;
    private speed: number;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;
    private onClickSubscribe: Subscription;
    private gameState: GameStateEnum;

    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<ClicksEnum>,
                private textWriter: TextWriter,
                private mealFactory: MealFactory,
                ) {
        this.snake = new Snake(this.canvas);
        this.textWriter.setCharData(textSmallData);
    }

    public start(): Game {
        this.gameState = GameStateEnum.GAME;
        this.speed = config.SPEED / AppState.getLevel();
        this.canvas.clear();
        this.provideApple();
        this.bindEvents();
        this.loop();
        this.draw();

        return this;
    }

    private bindEvents(): void {
        this.onClickSubscribe = this.onClick.subscribe((event) => {
            if (this.gameState === GameStateEnum.GAME) {
                switch (event) {
                    case ClicksEnum.LEFT:
                        this.snake.turnLeft();
                        break;
                    case ClicksEnum.RIGHT:
                        this.snake.turnRight();
                        break;
                    case ClicksEnum.UP:
                        this.snake.turnUp();
                        break;
                    case ClicksEnum.DOWN:
                        this.snake.turnDown();
                        break;
                }
                if (config.DEBUG_MOVING) {
                    this.testMove();
                }
            } else if (this.gameState === GameStateEnum.GAME_END) {
                this.drawHighScore();
            } else {

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
        clearInterval(this.interval);
        this.snake.restore();
        AppState.refreshTopScore(this.points);
        this.gameState = GameStateEnum.GAME_END;
        this.drawEndState();
    }

    private drawEndState(counter: number = 7): void {
        if (this.gameState !== GameStateEnum.GAME_END) {
            return;
        }
        this.draw(counter % 2 === 0);
        if (counter) {
            setTimeout(() => {
                this.drawEndState(counter - 1);
            }, 250);
        } else {
            this.drawHighScore();
        }
    }

    private drawHighScore() {
        this.gameState = GameStateEnum.HIGH_SCORE;
        const scoreView = new ScoreView(this.canvas, this.textWriter, this.onClick);
        const subscription = scoreView.exit.subscribe(() => {
            subscription.unsubscribe();
            this.onClickSubscribe.unsubscribe();
            this.stageHandler.next(AppEvent.endGame());
        });
        scoreView.draw(this.points);
    }

    private testMove(): void {
        this.handleMove();
    }

    private draw(withSnake: boolean = true) {
        const gameBoardPixels: Pixel[] = [];
        const absolutePixels: Pixel[] = [];

        if (withSnake) {
            gameBoardPixels.push(...this.snake.getPixels({
                    additionalPixelsSets: this.bug ?
                        [this.apple.getPixels(), this.bug.getPixels()] :
                        [this.apple.getPixels()],
                },
            ));
        }

        gameBoardPixels.push(...this.apple.getPixels());
        absolutePixels.push(...this.textWriter.write(
            TextWriter.padStart(this.points.toString(), '0', 4), new Position(1, 1),
        ).getPixels());

        if (this.bug) {
            gameBoardPixels.push(...this.bug.getPixels());
            const bugPointsLeftText = this.textWriter.write(TextWriter.padStart(this.bug.value.toString(), '0', 2));
            const xBugPointsOffset = config.CANVAS_WIDTH - (2 * textSmallData[0].width);
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
        this.canvas.drawPixels(getMaskPixels(), new Position(0, 0), config.DEBUG_CANVAS ? ColorsEnum.RED : ColorsEnum.GREEN);
    }

    private loop(): void {
        if (!config.DEBUG_MOVING) {
            if (this.gameState === GameStateEnum.GAME) {
                this.handleMove();
                this.interval = setTimeout(this.loop.bind(this), this.speed);
            }
        }
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
        if (!this.bug && (Math.random() * 100 > 85)) {
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
