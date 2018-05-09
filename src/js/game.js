import canvas from './canvas';
import Snake from './snake';

const speed = 1000;

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
        this.snake.draw();
        setTimeout(this.loop.bind(this), speed);
    }
}

export default Game;
