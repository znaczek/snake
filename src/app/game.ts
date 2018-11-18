import {Canvas} from './canvas';
import {Snake} from './snake';
import * as config from '../config';
import {MealFactory} from './factory/apple.factory';
import {Apple} from './model/apple.model';
import {Observable} from 'rxjs/index';
import {takeWhile} from 'rxjs/internal/operators';
import {TextWriter} from './text-writer';
import {Position} from './model/position.model';
import {Bug} from './model/bug.model';

export class Game {
    private snake: Snake;
    private gameOn: boolean;
    private interval: number;
    private apple: Apple;
    private bug: Bug = null;
    private points: number = 0;
    private _i: number;

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
                    // if (i > 0) {
                    //     this._i -= 1;
                    //     this.singleMove();
                    // }
                    break;
                case 39: // right
                    this.snake.turnRight();
                    this.testMove();
                    // if (i < moves.length) {
                    //     this._i += 1;
                    //     this.singleMove();
                    // }
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
            this.apple = this.mealFactory.generateApple(this.snake.getPixels());
            return;
        }
    }

    private singleMove(): void {
        this.snake.reset();
        for (let j = 0; j < this._i; j += 1) {
            switch (config.MOVES[j]) {
                case 'left': {
                    this.snake.turnLeft();
                    break;
                }
                case 'right': {
                    this.snake.turnRight();
                    break;
                }
                case 'up': {
                    this.snake.turnUp();
                    break;
                }
                case 'down': {
                    this.snake.turnDown();
                    break;
                }
            }
            this.snake.move();
        }
        this.canvas.prepareBoard();
        this.snake.draw();
    }

    private hasCollision(): boolean {
        return this.snake.hasCollision();
    }

    private endGame(): void {
        this.gameOn = false;
        clearTimeout(this.interval);
        this.snake.endGame();
        let i = 0;
        this.canvas.prepareBoard();
        this.draw();
        setInterval(() => {
            this.canvas.prepareBoard();
            this.canvas.drawApple(this.apple);
            if (i % 2) {
                this.snake.draw();
            }
            i += 1;
        }, 500);
    }

    private testMove(): void {
        this.handleMove();
    }

    private draw() {
        this.snake.draw();
        this.canvas.drawApple(this.apple);
        this.canvas.drawBug(this.bug);
        this.textWriter.setPosition(new Position(0, 0));
        this.textWriter.write(TextWriter.padStart(this.points.toString(), '0', 4));
    }

    private loop(): void {
        // this.handleMove();
        this.interval = setTimeout(this.loop.bind(this), config.SPEED);
    }

    private handleMove(): void {
        this.canvas.prepareBoard();
        this.snake.move();
        if (!this.hasCollision()) {
            this.provideApple();
            this.refreshBug();
            this.handleEating();
            this.draw();
        } else {
            this.endGame();
        }
    }

    private handleEating(): void {
        if (this.snake.didEat(this.apple)) {
            this.apple = this.mealFactory.generateApple(this.snake.getPixels());
            this.handleBugGeneration();
            this.snake.grow();
            this.points += 1;
        } else if (this.snake.didEat(this.bug)) {
            this.snake.grow();
            this.points += this.bug.value;
            this.bug = null;
            this.handleBugGeneration();
        }
    }

    private handleBugGeneration(): void {
        if (!this.bug && (Math.random() * 100 > 50)) {
            this.bug = this.mealFactory.generateBug(this.snake.getPixels());
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
