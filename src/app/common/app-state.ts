import {GameDataInterface} from './interfaces/game-data.interface';

export class AppState {
    public static readonly LEVEL = '7ehow8d7uh9';
    public static readonly MAZE = '23rhewf79dpsyh';
    public static readonly TOP_SCORE = 'e7wf9hdjsoi14';
    public static readonly GAME_DATA = 'e9wh8odir23ed';

    public static getLevel(): number {
        return parseInt(window.localStorage.getItem(AppState.LEVEL), 10) || 1;
    }

    public static setLevel(level: number) {
        window.localStorage.setItem(AppState.LEVEL, level.toString());
    }

    public static  getMaze(): number {
        return parseInt(window.localStorage.getItem(AppState.MAZE), 10) || 1;
    }

    public static setMaze(maze: number) {
        window.localStorage.setItem(AppState.MAZE, maze.toString());
    }

    public static getTopScore(): number {
        return parseInt(JSON.parse(window.localStorage.getItem(AppState.TOP_SCORE)), 10) || 0;
    }

    public static refreshTopScore(score: number): void {
        const topScore = AppState.getTopScore();
        if (score > topScore) {
            window.localStorage.setItem(AppState.TOP_SCORE, score.toString());
        }
    }

    public static saveGame(data: GameDataInterface): void {
        window.localStorage.setItem(AppState.GAME_DATA, JSON.stringify(data));
    }

    public static getGameData(): GameDataInterface {
        return <GameDataInterface>JSON.parse(window.localStorage.getItem(AppState.GAME_DATA));
    }

    public static clearGameData(): void {
        window.localStorage.removeItem(AppState.GAME_DATA);
    }

}
