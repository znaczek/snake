import {Canvas} from './canvas';
import {Snake} from './snake';
import * as config from '../config';
import {AppleGenerator} from './factory/apple.factory';
import {Apple} from './model/apple.model';

export class Game {
    private snake: Snake;
    private appleGenerator: AppleGenerator;
    private gameOn: boolean;
    private interval: number;
    private apple: Apple;
    private _i: number;

    constructor(private canvas: Canvas) {
    }

    public init(): void {
        this.canvas.clear();
        this.snake = new Snake(this.canvas);
        this.appleGenerator = new AppleGenerator();
        this.handleApple();
        this.bindEvents();
        this.loop();
        this.testMove();
        this.gameOn = true;
    }

    private bindEvents(): void {
        document.addEventListener('keydown', (e) => {
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

    private handleApple(): void {
        if (!this.apple) {
            this.apple = this.appleGenerator.generate();
            return;
        }
        if (this.snake.didEatApple(this.apple)) {
            this.apple = this.appleGenerator.generate();
            this.snake.grow();
        }
        this.canvas.drawApple(this.apple);
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

    private checkCollision(): boolean {
        if (this.snake.hasCollision()) {
            this.endGame();
            return true;
        }
        return false;
    }

    private endGame(): void {
        this.gameOn = false;
        clearTimeout(this.interval);
        this.snake.endGame();
        let i = 0;
        this.canvas.prepareBoard();
        this.handleApple();
        this.snake.draw();
        setInterval(() => {
            this.canvas.prepareBoard();
            this.handleApple();
            if (i % 2) {
                this.snake.draw();
            }
            i += 1;
        }, 500);
    }

    private testMove(): void {
        this.canvas.prepareBoard();
        this.snake.move();
        if (!this.checkCollision()) {
            this.handleApple();
            this.snake.draw();
        }
    }

    private loop(): void {
        // this.canvas.prepareBoard();
        // this.snake.move();
        // this.handleApple();
        // this.snake.draw();
        this.interval = setTimeout(this.loop.bind(this), config.SPEED);
    }
}
