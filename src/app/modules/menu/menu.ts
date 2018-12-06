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
import {Pixel} from '../../common/model/pixel.model';

export class Menu {

    private onClickSubscription: Subscription;
    private cursor: number = null;
    private offset: number = 0;
    private parentOffset: number = 0;
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
                this.goBackToParent();
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
            this.goBackToParent();
            return true;
        } else {
            this.goIntoMenu(selectedMenuItem);
            return true;
        }
    }

    private goIntoMenu(selectedMenuItem: MenuItem) {
        this.currentMenuItem = selectedMenuItem;
        this.parentCursor = this.cursor;
        this.cursor = this.getDefaultCursor();
        this.offset = 0;
        this.getVisibleChildren().forEach((item: MenuItem) => {
            if (item.setCursorCondition && item.setCursorCondition.call(this)) {
                this.cursor = item.id;
            }
        });
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

        const currentIndex = this.getCurrentIndex();
        const availableChildren = this.getVisibleChildren();
        const availableMenuSlots = availableChildren.reduce((acc: number, curr: MenuItem, index: number) => {
            if ((index + 1) * MENU_ITEM_HEIGHT < config.CANVAS_HEIGHT - config.TOP_BAR_HEIGHT) {
                return acc + 1;
            }
            return acc;
        }, 0);
        if (currentIndex >= availableMenuSlots + this.offset) {
            this.offset = Math.max(this.offset, Math.abs(availableMenuSlots - currentIndex - 1));
        } else if (currentIndex < this.offset) {
            this.offset = Math.min(this.offset, currentIndex);
        }

        const drawableChildren = this.getVisibleChildren().filter((item: MenuItem, index: number) => {
            return index >= this.offset && (index - this.offset + 1) * MENU_ITEM_HEIGHT < config.CANVAS_HEIGHT - config.TOP_BAR_HEIGHT;
        });

        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.drawingUtils.drawMenuHeader(this.getSelectedMenuItem().parent.text.text));
        drawableChildren
            .forEach((item: MenuItem, index: number) => {
                let color = ColorsEnum.BLACK;
                if (this.cursor === item.id) {
                    this.canvas.drawPixels(DrawingUtils.getMenuItemBackground(index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT));
                    color = ColorsEnum.GREEN;
                }
                const pixels = item.text.getPixels({
                    offset: new Position(0, index * MENU_ITEM_HEIGHT + config.TOP_BAR_HEIGHT),
                    color,
                });
                this.canvas.drawPixels(pixels, new Position(2, 2));
            });

        this.canvas.drawPixels(DrawingUtils.drawScrollBar(currentIndex, availableChildren.length));
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
        const currentIndex = this.getCurrentIndex();
        if (currentIndex - 1 < 0) {
            this.cursor = children[children.length - 1].id;
        } else {
            this.cursor = children[currentIndex - 1].id;
        }
    }

    private goToNextMenuItem() {
        const children = this.getVisibleChildren();
        const currentIndex = this.getCurrentIndex();
        if (currentIndex + 1 >= children.length) {
            this.cursor = children[0].id;
        } else {
            this.cursor = children[currentIndex + 1].id;
        }
    }

    private getCurrentIndex(): number {
        return this.getVisibleChildren().findIndex((item) => item.id === this.cursor);
    }

    private goBackToParent(): void {
        if (this.currentMenuItem && this.currentMenuItem.parent) {
            this.cursor = this.parentCursor;
            this.offset = this.parentOffset;
            this.currentMenuItem = this.currentMenuItem.parent;
        }
    }

    private setLevel(level: number): boolean {
        AppState.setLevel(level);
        this.goBackToParent();
        return true;
    }

    private setMaze(maze: number): boolean {
        AppState.setMaze(maze);
        this.goBackToParent();
        return true;
    }

    private checkLevelCursor(level: number): boolean {
        return AppState.getLevel() === level;
    }

    private checkMazeCursor(maze: number): boolean {
        return AppState.getMaze() === maze;
    }

}
