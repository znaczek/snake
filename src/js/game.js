import canvas from './canvas';
import Snake from './snake';

const SPEED = 500;

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
                case 37:
                    this.snake.turnLeft();
                    break;
                case 39:
                    this.snake.turnRight();
                    break;
                case 38:
                    this.snake.turnUp();
                    break;
                case 40:
                    this.snake.turnDown();
                }
        });
    }

    loop() {
        console.log('loop');
        canvas.clear();
        canvas.drawGameBorder();
        this.snake.draw();
        console.log(this.snake.direction);
        setTimeout(this.loop.bind(this), SPEED);
    }
}

export default Game;
