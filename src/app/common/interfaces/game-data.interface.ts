import {Apple} from '../../modules/game/model/apple.model';
import {Bug} from '../../modules/game/model/bug.model';
import {SavedSnake} from '../../modules/game/model/saved-snake.model';

export interface GameDataInterface {
    snake: SavedSnake;
    points: number;
    apple: Apple;
    bug: Bug;
}
