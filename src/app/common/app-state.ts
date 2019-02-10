import {GameDataInterface} from './interfaces/game-data.interface';
import {Utils} from './utils/utils';

export class AppState {
    public static readonly VERSION_KEY = 'VERSION';
    public static readonly VERSION = '2';

    public static readonly LEVEL = btoa('LEVEL');
    public static readonly MAZE = btoa('MAZE');
    public static readonly TOP_SCORE = btoa('TOP_SCORE');
    public static readonly GAME_DATA = btoa('GAME_DATA');

    public static validateState(): void {
        const version = AppState.getItem(AppState.VERSION_KEY);
        if (version !== AppState.VERSION) {
            AppState.removeItem(AppState.LEVEL);
            AppState.removeItem(AppState.MAZE);
            AppState.removeItem(AppState.GAME_DATA);

            const score = AppState.getItem(AppState.TOP_SCORE);
            if (!Utils.isInt(score)) {
                AppState.removeItem(AppState.GAME_DATA);
            }
        }
        AppState.setItem(AppState.VERSION_KEY, AppState.VERSION);
    }

    public static getLevel(): number {
        return parseInt(AppState.getItem(AppState.LEVEL), 10) || 1;
    }

    public static setLevel(level: number): void {
        AppState.setItem(AppState.LEVEL, level.toString());
    }

    public static  getMaze(): number {
        return parseInt(AppState.getItem(AppState.MAZE), 10) || 1;
    }

    public static setMaze(maze: number): void {
        AppState.setItem(AppState.MAZE, maze.toString());
    }

    public static getTopScore(): number {
        return parseInt(AppState.getItem(AppState.TOP_SCORE), 10) || 0;
    }

    public static refreshTopScore(score: number): void {
        const topScore = AppState.getTopScore();
        if (score > topScore) {
            AppState.setItem(AppState.TOP_SCORE, score.toString());
        }
    }

    public static getGameData(): GameDataInterface {
        try {
            const data = AppState.getItem(AppState.GAME_DATA);
            if (data) {
                return <GameDataInterface>JSON.parse(data);
            }
        } catch {
            console.error('Problem in reading game data.');
        }
    }

    public static saveGame(data: GameDataInterface): void {
        AppState.setItem(AppState.GAME_DATA, JSON.stringify(data));
    }

    public static clearGameData(): void {
        AppState.removeItem(AppState.GAME_DATA);
    }

    private static getItem(key: string): string {
        return atob(window.localStorage.getItem(key) || '');
    }

    private static setItem(key: string, value: string): void {
        window.localStorage.setItem(key, btoa(value));
    }

    private static removeItem(key: string): void {
        window.localStorage.removeItem(key);
    }

}
