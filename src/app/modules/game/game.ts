import {Canvas} from '../../common/canvas';
import {Snake} from './snake';
import {Config} from '../../../Config';
import {MealFactory} from './factory/meal.factory';
import {Apple} from './model/apple.model';
import {Observable, Subject, Subscription} from 'rxjs/index';
import {TextWriter} from '../../common/text-writer';
import {Bug} from './model/bug.model';
import {textSmallData} from '../../common/data/text-small.data';
import {Position} from '../../common/model/position.model';
import {Pixel} from '../../common/model/pixel.model';
import {getGameBoarderPixels, getGameBoardOffset, getMaskPixels} from './utils/utils';
import {AppEvent} from '../../common/model/game-event.model';
import {ClicksEnum} from '../../common/enums/clicks.enum';
import {AppState} from '../../common/app-state';
import {ScoreView} from './views/score.view';
import {GameStateEnum} from './enums/game-state.enum';
import {Mazez} from './data/mazes.data';

export class Game {
    private snake: Snake;
    private speed: number;
    private maze: number;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;
    private onClickSubscribe: Subscription;
    private gameState: GameStateEnum;
    private paused: boolean = false;

    constructor(private config: Config,
                private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<ClicksEnum>,
                private textWriter: TextWriter,
                private mealFactory: MealFactory,
                ) {
        this.snake = new Snake();
        this.textWriter.setCharData(textSmallData);
    }

    public start(resumed: boolean): Game {
        this.speed = Config.SPEED / AppState.getLevel();
        this.maze = AppState.getMaze();
        this.bindEvents();
        this.canvas.clear();
        this.gameState = GameStateEnum.GAME;

        if (resumed) {
            const gameData = AppState.getGameData();
            this.snake.set(gameData.snake);
            this.apple = new Apple(gameData.apple.x, gameData.apple.y);
            this.bug = gameData.bug ? new Bug(gameData.bug.x, gameData.bug.y, gameData.bug.type, gameData.bug.value) : null;
            this.points = gameData.points;
            this.paused = true;
        } else {
            this.provideApple();
            this.loop();
        }

        AppState.clearGameData();
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
                    case ClicksEnum.ESCAPE: {
                        this.pauseGame();
                    }
                }
                if (this.paused) {
                    if (event === ClicksEnum.LEFT ||
                        event === ClicksEnum.RIGHT ||
                        event === ClicksEnum.UP ||
                        event === ClicksEnum.DOWN) {
                        this.loop();
                    }
                    this.paused = false;
                }
                if (Config.DEBUG_MOVING) {
                    this.testMove();
                }
            }
        });
    }

    private provideApple(): void {
        if (!this.apple) {
            this.apple = this.mealFactory.generateApple(this.getForbiddenPositionsForApple());
            return;
        }
    }

    private getForbiddenPositionsForApple(): Position[] {
        return [
            ...this.getCommonForbiddenPositions(),
            ...(this.bug ? this.bug.getBoundary().getPixels() : []),
        ];
    }

    private getForbiddenPixelsForBug(): Position[] {
        return [
            ...this.getCommonForbiddenPositions(),
            ...this.apple.getBoundary().getPixels(),
        ];
    }

    private getCommonForbiddenPositions(): Position[] {
        return [
            ...this.snake.getBodyBoundaryPositions(),
            ...Mazez.getForbiddenPixels(this.maze),
        ];
    }

    private hasCollision(): boolean {
        return this.snake.checkSelfCollision() || this.snake.chekMazeColission(this.getMazePixels());
    }

    private endGame(): void {
        clearInterval(this.interval);
        this.snake.restore();
        AppState.refreshTopScore(this.points);
        this.gameState = GameStateEnum.GAME_END;
        this.drawEndState();
    }

    private close() {
        this.gameState = GameStateEnum.HIGH_SCORE;
        this.onClickSubscribe.unsubscribe();
    }

    private pauseGame() {
        AppState.saveGame({
            snake: this.snake.serialize(),
            points: this.points,
            apple: this.apple,
            bug: this.bug,
        });
        this.close();
        this.stageHandler.next(AppEvent.endGame());
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
            this.close();
            this.stageHandler.next(AppEvent.endGame());
        });
        scoreView.draw(this.points);
    }

    private testMove(): void {
        this.handleMove();
    }

    private getMazePixels(): Pixel[] {
        return Mazez.getPixels(this.maze);
    }

    private draw(withSnake: boolean = true) {
        this.canvas.clear();
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
        gameBoardPixels.push(...this.getMazePixels());

        absolutePixels.push(...this.textWriter.write(
            TextWriter.padStart(this.points.toString(), '0', 4), new Position(1, 1),
        ).getPixels());

        if (this.bug) {
            gameBoardPixels.push(...this.bug.getPixels());
            const bugPointsLeftText = this.textWriter.write(TextWriter.padStart(this.bug.value.toString(), '0', 2));
            const xBugPointsOffset = Config.CANVAS_WIDTH - (2 * textSmallData[0].width);
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
        this.canvas.drawPixels(getMaskPixels());
    }

    private loop(): void {
        if (!Config.DEBUG_MOVING) {
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
            this.apple = this.mealFactory.generateApple(this.getForbiddenPositionsForApple());
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
