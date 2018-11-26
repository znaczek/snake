import {MAX_HIGHT_SCORES_COUNT} from './common.constants';

export class AppState {

    public static getLevel(): number {
        return parseInt(window.localStorage.getItem('level'), 10) || 1;
    }

    public static setLevel(level: number) {
        window.localStorage.setItem('level', level.toString());
    }

    public static  getMaze(): number {
        return parseInt(window.localStorage.getItem('maze'), 10) || 1;
    }

    public static setMaze(maze: number) {
        window.localStorage.setItem('maze', maze.toString());
    }

    public static getHighScores(): number[] {
        return JSON.parse(window.localStorage.getItem('highScores'));
    }

    public static addHighScore(score: number): void {
        const highScores = AppState.getHighScores() || [];
        if (highScores.length === 0) {
            highScores.push(score);
        } else {
            for (let i = 0; i < highScores.length; i += 1) {
                if (score > highScores[i]) {
                    highScores.splice(i, 0, score);
                    break;
                }
            }
        }

        console.log('set high score');
        highScores.splice(MAX_HIGHT_SCORES_COUNT, highScores.length);
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
    }

}
