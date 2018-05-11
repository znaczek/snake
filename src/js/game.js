import canvas from './canvas';
import Snake from './snake';

const SPEED = 1000;

class Game {
    constructor(canvasElement) {
        canvas.setElement(canvasElement);
    }

    init() {
        canvas.clear();
        this.snake = new Snake();
        this.loop();
    }

    loop() {
        console.log('loop');
        canvas.clear();
        canvas.drawGameBorder();
        this.snake.draw();
        // canvas.getCtx().fillRect(0, 0, 100, 100);
        setTimeout(this.loop.bind(this), SPEED);
    }
}

export default Game;
