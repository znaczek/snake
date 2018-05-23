import canvas from './canvas';
import Snake from './snake';
import AppleGenerator from './appleGenerator';

const SPEED = 1000;
const moves = [
    'Right', 'Right',
    'Up', 'Up', 'Up',
    'Left', 'Left', 'Left', 'Left', 'Left', 'Left',
    'Down', 'Down', 'Down',
    'Right', 'Right', 'Right', 'Right',
    'Right', 'Right',
    'Down', 'Down', 'Down',
    'Left', 'Left', 'Left', 'Left', 'Left', 'Left',
    'Up', 'Up', 'Up',
    'Right', 'Right', 'Right', 'Right'
];
let i = 0;

class Game {
    constructor(canvasElement) {
        canvas.setElement(canvasElement);
    }

    init() {
        canvas.clear();
        this.snake = new Snake();
        this.appleGenerator = new AppleGenerator();
        this.handleApple();
        this.bindEvents();
        this.loop();
        this.testMove();
        this.gameOn = true;
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameOn) return;
            switch (e.keyCode) {
                case 37: //left
                    this.snake.turnLeft();
                    this.testMove();
                    // if (i > 0) {
                    //     i -= 1;
                    //     this.singleMove();
                    // }
                    break;
                case 39: //right
                    this.snake.turnRight();
                    this.testMove();
                    // if (i < moves.length) {
                    //     i += 1;
                    //     this.singleMove();
                    // }
                    break;
                case 38: //up
                    this.snake.turnUp();
                    this.testMove();
                    break;
                case 40: //up
                    this.snake.turnDown();
                    this.testMove();
                    break;
                case 32:  //space
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

    handleApple() {
        if (!this.apple) {
            this.apple = this.appleGenerator.generate();
            return;
        }
        if (this.snake.didEatApple(this.apple)) {
            this.apple = this.appleGenerator.generate();
            this.snake.grow();
        }
        canvas.drawApple(this.apple);
    }

    singleMove() {
        this.snake.reset();
        for (let j = 0; j < i; j += 1) {
            this.snake['turn' + moves[j]]();
            this.snake.move();
        }
        canvas.prepareBoard();
        this.snake.draw();
    }

    checkCollision() {
        if (this.snake.hasCollision()) {
            this.endGame();
            return true;
        }
        return false;
    }

    endGame() {
        this.gameOn = false;
        clearTimeout(this.interval);
        this.snake.endGame();
        let i = 0;
        canvas.prepareBoard();
        this.handleApple();
        this.snake.draw();
        setInterval(() => {
            canvas.prepareBoard();
            this.handleApple();
            if (i % 2) {
                this.snake.draw();
            }
            i += 1;
        }, 500);
    }

    testMove() {
        canvas.prepareBoard();
        this.snake.move();
        if (!this.checkCollision()) {
            this.handleApple();
            this.snake.draw();
        }
    }

    loop() {
        // canvas.prepareBoard();
        // this.snake.move();
        // this.handleApple();
        // this.snake.draw();
        this.interval = setTimeout(this.loop.bind(this), SPEED);
    }
}

export default Game;
