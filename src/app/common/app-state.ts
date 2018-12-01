export class AppState {
    public static readonly LEVEL = 'level';
    public static readonly MAZE = 'maze';
    public static readonly TOP_SCORE = 'topScore';

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

}
