import * as config from './config';

class AppleGenerator{
    generate() {
        return {
            x: this.getNumber(config.CANVAS_WIDTH),
            y: this.getNumber(config.CANVAS_HEIGHT),
        };
    }

    getNumber(max) {
        return Math.ceil((Math.random() * (max - 8)) / 4) * 4;
    }
}

export default AppleGenerator;
