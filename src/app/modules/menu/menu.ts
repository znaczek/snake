import {Observable, Subject, Subscription} from 'rxjs';
import {AppEvent} from '../../common/model/game-event.model';
import {Canvas} from '../../common/canvas';
import {MenuItem} from './model/menu-item.model';
import {TextWriter} from '../../common/text-writer';
import {menuCharData} from '../../common/data/menu-text.data';
import {Pixel} from '../../common/model/pixel.model';
import {Position} from '../../common/model/position.model';
import {ColorsEnum} from '../../common/enums/color.enums';
import {MENU_ITEM_HEIGHT, MENU_ITEM_WIDTH} from './constants/menu-item.constants';
import {ClicksEnum} from '../../common/enums/clicks.enum';
import {MenuItemFactory} from './factory/menu-item.factory';
import {menuData} from './data/menu.data';
import {AppState} from '../../common/app-state';

export class Menu {
    private static getMenuItemBackground(yOffset: number = 0): Pixel[] {
        const pixels: Pixel[] = [];
        for(let x = 0; x < MENU_ITEM_WIDTH; x += 1) {
            for(let y = yOffset; y < yOffset + MENU_ITEM_HEIGHT; y += 1) {
                pixels.push(new Pixel(x, y));
            }
        }
        return pixels;
    }

    private onClickSubscription: Subscription;
    private cursor: number;
    private parentCursor: number;
    private currentMenuItem: MenuItem;
    private offset: number;
    private menuData: MenuItem;

    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<ClicksEnum>,
                private textWriter: TextWriter,
                private menuItemFactory: MenuItemFactory) {
        this.textWriter.setCharData(menuCharData);
    }

    public close() {
        this.onClickSubscription.unsubscribe();
    }

    public start(): Menu {
        this.onClickSubscription = this.onClick.subscribe((event) => {

            if (event === ClicksEnum.ENTER) {
                const selectedMenuItem = this.getSelectedMenuItem();

                if (selectedMenuItem.callback) {
                    if (typeof selectedMenuItem.callback === 'function') {
                        selectedMenuItem.callback.call(this);
                    }
                } else if (selectedMenuItem.back) {
                    this.cursor = this.parentCursor;
                    this.currentMenuItem = selectedMenuItem.parent.parent;
                    this.drawMenu();
                } else if (selectedMenuItem.children.length > 0) {
                    this.currentMenuItem = selectedMenuItem;
                    this.parentCursor = this.cursor;
                    this.cursor = 1;
                    this.currentMenuItem.children.forEach((item: MenuItem) => {
                        if (item.setCursorCondition && item.setCursorCondition.call(this)) {
                            this.cursor = item.ordinal;
                        }
                    });
                    this.drawMenu();
                }
            } else {
                if (event === ClicksEnum.UP) {
                    this.goToPreviousMenuItem();
                } else if (event === ClicksEnum.DOWN) {
                    this.goToNextMenuItem();
                }
            }
        });
        this.menuData = this.menuItemFactory.create(menuData);
        this.cursor = 1;
        this.currentMenuItem = this.menuData;
        this.drawMenu();
        return this;
    }

    private drawMenu() {
        this.canvas.prepareBoard();
        this.currentMenuItem.children.forEach((item: MenuItem, index: number) => {
            const pixels  = item.text.getPixels({
                offset: new Position(0, index * MENU_ITEM_HEIGHT),
            });
            if (this.cursor === item.ordinal) {
                this.canvas.drawPixels(Menu.getMenuItemBackground(index * MENU_ITEM_HEIGHT), undefined, ColorsEnum.BLACK);
                this.canvas.drawPixels(pixels, new Position(2, 1), ColorsEnum.GREEN);
            } else {
                this.canvas.drawPixels(pixels, new Position(2, 1));
            }
        });
    }

    private getSelectedMenuItem(): MenuItem {
        return this.currentMenuItem.children.find((item) => item.ordinal === this.cursor);
    }

    private goToPreviousMenuItem() {
        this.cursor -= 1;
        if (this.cursor === 0) {
            this.cursor = this.currentMenuItem.children.length;
        }
        this.drawMenu();
    }

    private goToNextMenuItem() {
        this.cursor += 1;
        if (this.cursor > this.currentMenuItem.children.length) {
            this.cursor = 1;
        }
        this.drawMenu();
    }

    private beforeSettingsSet(): void {
        this.cursor = this.parentCursor;
        this.currentMenuItem = this.currentMenuItem.parent;
    }

    private setLevel(level: number) {
        this.beforeSettingsSet();
        AppState.setLevel(level);
        this.drawMenu();
    }

    private setMaze(maze: number) {
        this.beforeSettingsSet();
        AppState.setMaze(maze);
        this.drawMenu();
    }

    private checkLevelCursor (level: number): boolean {
        return AppState.getLevel() === level;
    }

    private checkMazeCursor (maze: number): boolean {
        return AppState.getMaze() === maze;
    }

    private showHighScores(): void {
        this.canvas.prepareBoard();
        (AppState.getHighScores() || []).forEach((highScore: number, index: number) => {
            const scoreText = this.textWriter.write(`${index + 1}. ${highScore}`);
            const pixels = scoreText.getPixels({
                offset: new Position(0, index * MENU_ITEM_HEIGHT),
            });
            this.canvas.drawPixels(pixels, new Position(2, 1));
        });
    }

}
