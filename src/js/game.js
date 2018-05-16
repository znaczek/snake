import canvas from './canvas';
import Snake from './snake';

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
        this.bindEvents();
        this.loop();
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37: //left
                    this.snake.turnLeft();
            canvas.prepareBoard();
            this.snake.move();
            this.snake.draw();
                    // if (i > 0) {
                    //     i -= 1;
                    //     this.singleMove();
                    // }
                    break;
                case 39: //right
                    this.snake.turnRight();
            canvas.prepareBoard();
            this.snake.move();
            this.snake.draw();
                    // if (i < moves.length) {
                    //     i += 1;
                    //     this.singleMove();
                    // }
                    break;
                case 38: //up
                    this.snake.turnUp();
            canvas.prepareBoard();
            this.snake.move();
            this.snake.draw();
                    break;
                case 40: //up
                    this.snake.turnDown();
            canvas.prepareBoard();
            this.snake.move();
            this.snake.draw();
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

    singleMove() {
        this.snake.reset();
        for (let j = 0; j < i; j += 1) {
            this.snake['turn' + moves[j]]();
            this.snake.move();
        }
        canvas.prepareBoard();
        this.snake.draw();
    }

    loop() {
        canvas.prepareBoard();
        this.snake.draw();
        // this.interval = setTimeout(this.loop.bind(this), SPEED);
    }
}

export default Game;
