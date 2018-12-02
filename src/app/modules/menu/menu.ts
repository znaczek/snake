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
    private cursor: number = null;
    private parentCursor: number;
    private currentMenuItem: MenuItem;
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
                const shouldDrawMenu = this.handleMenuEnter();
                if (shouldDrawMenu) {
                    this.drawMenu();
                }
            } else if (event === ClicksEnum.ESCAPE) {
                this.goBack();
                this.drawMenu();
            } else {
                if (event === ClicksEnum.UP) {
                    this.goToPreviousMenuItem();
                } else if (event === ClicksEnum.DOWN) {
                    this.goToNextMenuItem();
                }
                this.drawMenu();
            }
        });
        this.currentMenuItem = this.menuItemFactory.create(menuData);
        this.cursor = this.getDefaultCursor();
        this.drawMenu();
        return this;
    }

    public close() {
        this.onClickSubscription.unsubscribe();
    }

    private getDefaultCursor(): number {
        return this.getVisibleChildren()[0] ? this.getVisibleChildren()[0].id : 1;
    }

    private handleMenuEnter(): boolean {
        const selectedMenuItem = this.getSelectedMenuItem();
        if (selectedMenuItem.customView) {
            this.currentMenuItem = selectedMenuItem;
            return true;
        } else if (selectedMenuItem.callback) {
            if (typeof selectedMenuItem.callback === 'function') {
                return selectedMenuItem.callback.call(this);
            }
        } else if (selectedMenuItem.back) {
            this.goBack();
            return true;
        } else {
            this.currentMenuItem = selectedMenuItem;
            this.parentCursor = this.cursor;
            this.cursor = this.getDefaultCursor();
            this.getVisibleChildren().forEach((item: MenuItem) => {
                if (item.setCursorCondition && item.setCursorCondition.call(this)) {
                    this.cursor = item.id;
                }
            });
            return true;
        }
    }

    private goBack() {
        if (this.currentMenuItem && this.currentMenuItem.parent) {
            this.cursor = this.parentCursor;
            this.currentMenuItem = this.currentMenuItem.parent;
        }
    }

    private drawMenu() {
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
        this.canvas.drawPixels(this.drawingUtils.drawMenuHeader(this.getSelectedMenuItem().parent.text.text));
        this.getVisibleChildren()
            .forEach((item: MenuItem, index: number) => {
                const pixels  = item.text.getPixels({
                    offset: new Position(0, index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT),
                });
                if (this.cursor === item.id) {
                    this.canvas.drawPixels(DrawingUtils.getMenuItemBackground(index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT), undefined, ColorsEnum.BLACK);
                    this.canvas.drawPixels(pixels, new Position(2, 1), ColorsEnum.GREEN);
                } else {
                    this.canvas.drawPixels(pixels, new Position(2, 1));
                }
            });
    }

    private getVisibleChildren(): MenuItem[] {
        if (this.currentMenuItem) {
            return (this.currentMenuItem.children || [])
                .filter((item: MenuItem) => typeof item.visible !== 'function' || item.visible.call(this));
        }
        return [];
    }

    private getSelectedMenuItem(): MenuItem {
        if (this.currentMenuItem && this.currentMenuItem.children) {
            return this.getVisibleChildren().find((item) => item.id === this.cursor);
        }
        return null;
    }

    private goToPreviousMenuItem() {
        const children = this.getVisibleChildren();
        const currentIndex = children.findIndex((item) => item.id === this.cursor);
        if (currentIndex - 1 < 0) {
            this.cursor = children[children.length - 1].id;
        } else {
            this.cursor = children[currentIndex - 1].id;
        }
    }

    private goToNextMenuItem() {
        const children = this.getVisibleChildren();
        const currentIndex = children.findIndex((item) => item.id === this.cursor);
        if (currentIndex + 1 >= children.length) {
            this.cursor = children[0].id;
        } else {
            this.cursor = children[currentIndex + 1].id;
        }
    }

    private beforeSettingsSet(): void {
        this.cursor = this.parentCursor;
        this.currentMenuItem = this.currentMenuItem.parent;
    }

    private setLevel(level: number): boolean {
        this.beforeSettingsSet();
        AppState.setLevel(level);
        return true;
    }

    private setMaze(maze: number): boolean {
        this.beforeSettingsSet();
        AppState.setMaze(maze);
        return true;
    }

    private checkLevelCursor (level: number): boolean {
        return AppState.getLevel() === level;
    }

    private checkMazeCursor (maze: number): boolean {
        return AppState.getMaze() === maze;
    }

}
