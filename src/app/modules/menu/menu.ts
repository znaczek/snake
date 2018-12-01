import {Observable, Subject, Subscription} from 'rxjs';
import {AppEvent} from '../../common/model/game-event.model';
import {Canvas} from '../../common/canvas';
import {MenuItem} from './model/menu-item.model';
import {TextWriter} from '../../common/text-writer';
import {textMediumData} from '../../common/data/text-medium.data';
import {Position} from '../../common/model/position.model';
import {ColorsEnum} from '../../common/enums/color.enums';
import {MENU_ITEM_HEIGHT} from './constants/menu-item.constants';
import {ClicksEnum} from '../../common/enums/clicks.enum';
import {MenuItemFactory} from './factory/menu-item.factory';
import {menuData} from './data/menu.data';
import {AppState} from '../../common/app-state';
import {DrawingUtils} from './utils/drawing.utils';
import * as config from '../../../config';
import {CustomViewInterface} from '../../common/interfaces/custom-view.interface';

export class Menu {

    private onClickSubscription: Subscription;
    private cursor: number;
    private parentCursor: number;
    private currentMenuItem: MenuItem;
    private menuData: MenuItem;
    private customView: CustomViewInterface = null;

    constructor(private stageHandler: Subject<AppEvent>,
                private canvas: Canvas,
                private onClick: Observable<ClicksEnum>,
                private textWriter: TextWriter,
                private menuItemFactory: MenuItemFactory,
                private drawingUtils: DrawingUtils) {
        this.textWriter.setCharData(textMediumData);
    }

    public start(): Menu {
        this.onClickSubscription = this.onClick.subscribe((event) => {
            if (this.customView) {
                return;
            }
            if (event === ClicksEnum.ENTER) {
                this.handleMenuEnter();
            } else if (event === ClicksEnum.ESCAPE) {
                this.goBack();
            } else {
                if (event === ClicksEnum.UP) {
                    this.goToPreviousMenuItem();
                } else if (event === ClicksEnum.DOWN) {
                    this.goToNextMenuItem();
                }
            }

            this.drawMenu();
        });
        this.menuData = this.menuItemFactory.create(menuData);
        this.cursor = 1;
        this.currentMenuItem = this.menuData;
        this.drawMenu();
        return this;
    }

    public close() {
        this.onClickSubscription.unsubscribe();
    }

    private handleMenuEnter() {
        const selectedMenuItem = this.getSelectedMenuItem();

        if (selectedMenuItem.callback) {
            if (typeof selectedMenuItem.callback === 'function') {
                selectedMenuItem.callback.call(this);
            }
        } else if (selectedMenuItem.back) {
            this.goBack();
        } else {
            this.currentMenuItem = selectedMenuItem;
            this.parentCursor = this.cursor;
            this.cursor = 1;
            this.currentMenuItem.children.forEach((item: MenuItem) => {
                if (item.setCursorCondition && item.setCursorCondition.call(this)) {
                    this.cursor = item.ordinal;
                }
            });
        }
    }

    private goBack() {;
        if (this.currentMenuItem && this.currentMenuItem.parent) {
            this.cursor = this.parentCursor;
            this.currentMenuItem = this.currentMenuItem.parent;
        }
    }

    private drawMenu() {
        const selectedMenuItem = this.getSelectedMenuItem();
        if (this.currentMenuItem.customView) {
            this.customView = new this.currentMenuItem.customView(
                this.canvas, this.textWriter, this.onClick, this.drawingUtils,
            );
            const exitSubscription = this.customView.exit.subscribe(() => {
                exitSubscription.unsubscribe();
                this.currentMenuItem = this.currentMenuItem.parent;
                this.customView = null;
                this.drawMenu();
            });
            this.customView.draw();
            return;
        }

        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.drawingUtils.drawMenuHeader(selectedMenuItem.parent.text.text));
        this.currentMenuItem.children.forEach((item: MenuItem, index: number) => {
            const pixels  = item.text.getPixels({
                offset: new Position(0, index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT),
            });
            if (this.cursor === item.ordinal) {
                this.canvas.drawPixels(DrawingUtils.getMenuItemBackground(index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT), undefined, ColorsEnum.BLACK);
                this.canvas.drawPixels(pixels, new Position(2, 1), ColorsEnum.GREEN);
            } else {
                this.canvas.drawPixels(pixels, new Position(2, 1));
            }
        });
    }

    private getSelectedMenuItem(): MenuItem {
        if (this.currentMenuItem && this.currentMenuItem.children) {
            return this.currentMenuItem.children.find((item) => item.ordinal === this.cursor);
        }
        return null;
    }

    private goToPreviousMenuItem() {
        this.cursor -= 1;
        if (this.cursor === 0) {
            this.cursor = this.currentMenuItem.children.length;
        }
    }

    private goToNextMenuItem() {
        this.cursor += 1;
        if (this.cursor > this.currentMenuItem.children.length) {
            this.cursor = 1;
        }
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

    }

}
