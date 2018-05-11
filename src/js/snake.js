import canvas from './canvas';

class Snake {
    draw() {
        canvas.drawHead(30, 20);
        canvas.drawBodyPart(25, 21);
        canvas.drawBodyPart(21, 21);
        canvas.drawBodyPart(17, 21);
        canvas.drawTail(12, 21);
    }
}

export default Snake;
