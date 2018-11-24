import {Canvas} from '../../common/canvas';
import {Snake} from './snake';
import * as config from '../../../config';
import {MealFactory} from './factory/meal.factory';
import {Apple} from './model/apple.model';
import {Observable} from 'rxjs/index';
import {takeWhile} from 'rxjs/operators';
import {TextWriter} from '../../common/text-writer';
import {Bug} from './model/bug.model';
import {charData} from '../../common/data/char.data';
import {Position} from '../../common/model/position.model';
import {Pixel} from '../../common/model/pixel.model';

export class Game {
    private snake: Snake;
    private gameOn: boolean;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;

    constructor(private canvas: Canvas,
                private mealFactory: MealFactory,
                private onClick: Observable<Event>,
                private textWriter: TextWriter) {
    }

    public init(): void {
        this.canvas.clear();
        this.snake = new Snake(this.canvas);
        this.provideApple();
        this.bindEvents();
        this.loop();
        this.testMove();

        this.gameOn = true;
    }

    private bindEvents(): void {
        this.onClick.pipe(takeWhile(() => this.gameOn))
            .subscribe((e: KeyboardEvent) => {
            if (!this.gameOn) {
                return;
            }
            switch (e.keyCode) {
                case 37: // left
                    this.snake.turnLeft();
                    this.testMove();
                    break;
                case 39: // right
                    this.snake.turnRight();
                    this.testMove();
                    break;
                case 38: // up
                    this.snake.turnUp();
                    this.testMove();
                    break;
                case 40: // up
                    this.snake.turnDown();
                    this.testMove();
                    break;
                case 32:  // space
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
        // Todo
    }

    private testMove(): void {
        this.handleMove();
    }

    private draw() {
        this.canvas.prepareBoard();
        this.canvas.drawGamePixels(this.snake.getPixels({
            mealPixels: this.bug ? [this.apple.getPixels(), this.bug.getPixels()] : [this.apple.getPixels()],
        }));
        this.canvas.drawGamePixels(this.apple.getPixels());
        const pointsText = this.textWriter.write(TextWriter.padStart(this.points.toString(), '0', 4), new Position(1, 0));
        this.canvas.drawPixels(pointsText.getPixels());
        if (this.bug) {
            this.canvas.drawGamePixels(this.bug.getPixels());
            const bugPointsLeftText = this.textWriter.write(TextWriter.padStart(this.bug.value.toString(), '0', 2));
            const xBugPointsOffset = config.CANVAS_WIDTH - (2 * charData[0].width);
            const xBugOffset = xBugPointsOffset - 2 - Bug.width;
            this.canvas.drawPixels(this.bug.getPixelsRelative(new Position(xBugOffset, 1)));
            this.canvas.drawPixels(bugPointsLeftText.getPixels({
                start: new Position(xBugPointsOffset, 0),
            }));
        }
        this.canvas.drawMask();
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
