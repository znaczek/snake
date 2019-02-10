import {Canvas} from '../../../common/canvas';
import {Snake} from '../model/snake';
import {Config} from '../../../../Config';
import {MealFactory} from '../factory/meal.factory';
import {Apple} from '../model/apple.model';
import {Subject} from 'rxjs/index';
import {TextWriter} from '../../../common/text-writer';
import {Bug} from '../model/bug.model';
import {textSmallData} from '../../../common/data/text-small.data';
import {Position} from '../../../common/model/position.model';
import {Pixel} from '../../../common/model/pixel.model';
import {StageEvent} from '../../../common/model/StageEvents';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {AppState} from '../../../common/app-state';
import {ScoreView} from './score.view';
import {GameStateEnum} from '../enums/game-state.enum';
import {Mazez} from '../data/mazes.data';
import {INIT_HEAD} from '../data/snake.data';
import {ViewInterface} from '../../../common/interfaces/view.interface';
import {GameUtils} from '../utils/utils';
import {Injectable} from '../../../common/di/injectable';
import {StageHandler} from '../../../common/observables/stage-handler';
import {ClickObservable} from '../../../common/observables/click-observable';
import {Provide} from '../../../common/di/provide';
import {MainMenu} from '../../menu/views/main-menu.view';
import {takeUntil} from 'rxjs/internal/operators';

@Injectable
@Provide({
    singleton: false,
})
export class Game implements ViewInterface {
    private snake: Snake;
    private loopTick: number;
    private maze: number;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;
    private gameState: GameStateEnum;
    private paused: boolean = false;
    private unsubscribe$: Subject<void> = new Subject();

    constructor(private config: Config,
                private stageHandler$: StageHandler<StageEvent<number>>,
                private canvas: Canvas,
                private onClick$: ClickObservable<ClicksEnum>,
                private textWriter: TextWriter,
                private mealFactory: MealFactory) {
        this.maze = AppState.getMaze();
        this.snake = new Snake(INIT_HEAD[this.maze]);
        this.textWriter.setCharData(textSmallData);
    }

    public start(resumed: boolean): Game {
        this.loopTick = Config.SPEED / AppState.getLevel();
        this.bindEvents();
        this.canvas.clear();
        this.gameState = GameStateEnum.GAME;

        if (resumed) {
            const gameData = AppState.getGameData();
            this.snake.deserialize(gameData.snake);
            const forbiddenPoints = this.getForbiddenPositionsForApple();
            this.apple = this.mealFactory.regenerateApple(gameData.apple, forbiddenPoints);
            this.bug = gameData.bug ? this.mealFactory.regenerateBug(gameData.bug, forbiddenPoints) : null;
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

    public close() {
        this.unsubscribe$.next();
    }

    public pauseGame() {
        if (this.gameState === GameStateEnum.GAME) {
            AppState.saveGame({
                snake: this.snake.serialize(),
                points: this.points,
                apple: this.apple,
                bug: this.bug,
            });
        }
        this.gameState = GameStateEnum.PAUSED;
        this.stageHandler$.next(new StageEvent(MainMenu));
    }

    private bindEvents(): void {
        this.onClick$.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
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
        this.stageHandler$.next(new StageEvent(ScoreView, this.points));
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
        absolutePixels.push(...GameUtils.getGameBoarderPixels());

        this.canvas.prepareBoard();
        this.canvas.drawPixels(gameBoardPixels, GameUtils.getGameBoardOffset());
        this.canvas.drawPixels(absolutePixels);
        this.canvas.drawPixels(GameUtils.getMaskPixels());
    }

    private loop(): void {
        if (!Config.DEBUG_MOVING) {
            if (this.gameState === GameStateEnum.GAME) {
                this.handleMove();
                this.interval = setTimeout(this.loop.bind(this), this.loopTick);
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
        if (!this.bug && (Math.random() * 10 > 9)) {
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
