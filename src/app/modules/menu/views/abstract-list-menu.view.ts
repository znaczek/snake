import {Subject} from 'rxjs';
import {StageEvent} from '../../../common/model/StageEvents';
import {Canvas} from '../../../common/canvas';
import {TextWriter} from '../../../common/text-writer';
import {Position} from '../../../common/model/position.model';
import {ColorsEnum} from '../../../common/enums/color.enums';
import {MENU_ITEM_HEIGHT} from '../constants/menu-item.constants';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {Config} from '../../../../Config';
import {ViewInterface} from '../../../common/interfaces/view.interface';
import {StageHandler} from '../../../common/observables/stage-handler';
import {ClickObservable} from '../../../common/observables/click-observable';
import {MenuListItemInterface} from '../interfaces/menu-list-item.interface';
import {DrawingService} from '../service/drawing.service';
import {textMediumData} from '../../../common/data/text-medium.data';
import {Injectable} from '../../../common/di/injectable';
import {takeUntil} from 'rxjs/internal/operators';
import {ConstructorInterface} from '../../../common/interfaces/constructor.interface';

@Injectable
export abstract class AbstractListMenuView implements ViewInterface {

    protected abstract readonly header: string;
    protected abstract readonly parentView: ConstructorInterface;

    protected cursor: number = null;
    protected offset: number = 0;
    protected list: MenuListItemInterface[];

    private unsubscribe$: Subject<void> = new Subject();

    constructor(protected config: Config,
                protected stageHandler$: StageHandler<StageEvent<any>>,
                protected canvas: Canvas,
                protected onClick$: ClickObservable<ClicksEnum>,
                protected textWriter: TextWriter,
                protected drawingService: DrawingService) {
    }

    public start(startItem: number): void {
        this.list = this.getListData()
            .filter((item: MenuListItemInterface) => typeof item.visible !== 'function' || item.visible());
        this.onClick$.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
            if (event === ClicksEnum.ENTER) {
                this.getCurrentItem().callback.apply(this);
            } else if (event === ClicksEnum.ESCAPE) {
                if (this.parentView) {
                    this.back();
                }
            } else {
                if (event === ClicksEnum.UP) {
                    this.goToPreviousMenuItem();
                } else if (event === ClicksEnum.DOWN) {
                    this.goToNextMenuItem();
                }
                this.drawMenu();
            }
        });
        this.cursor = this.getStartCursor(startItem);
        this.drawMenu();
    }

    public close() {
        this.unsubscribe$.next();
    }

    protected abstract getListData(): MenuListItemInterface[];

    protected back() {
        this.stageHandler$.next(new StageEvent<any>(this.parentView));
    }

    private drawMenu() {

        const availableMenuSlots: number = this.list.reduce((acc: number, curr: MenuListItemInterface, index: number) => {
            if ((index + 1) * MENU_ITEM_HEIGHT < Config.CANVAS_HEIGHT - Config.TOP_BAR_HEIGHT) {
                return acc + 1;
            }
            return acc;
        }, 0);
        if (this.cursor >= availableMenuSlots + this.offset) {
            this.offset = Math.max(this.offset, Math.abs(availableMenuSlots - this.cursor - 1));
        } else if (this.cursor < this.offset) {
            this.offset = Math.min(this.offset, this.cursor);
        }

        const drawableChildren = this.list.filter((item: MenuListItemInterface, index: number) => {
            return index >= this.offset && (index - this.offset + 1) * MENU_ITEM_HEIGHT < Config.CANVAS_HEIGHT - Config.TOP_BAR_HEIGHT;
        });

        this.canvas.prepareBoard();
        this.canvas.drawPixels(this.drawingService.drawMenuHeader(this.header));
        this.textWriter.setCharData(textMediumData);

        drawableChildren
            .forEach((item: MenuListItemInterface, index: number) => {
                let color = ColorsEnum.BLACK;
                if (this.cursor === index + this.offset) {
                    this.canvas.drawPixels(DrawingService.getMenuItemBackground(index * MENU_ITEM_HEIGHT + Config.TOP_BAR_HEIGHT));
                    color = ColorsEnum.GREEN;
                }
                const pixels = this.textWriter.write(item.text).getPixels({
                    offset: new Position(0, index * MENU_ITEM_HEIGHT + Config.TOP_BAR_HEIGHT),
                    color,
                });
                this.canvas.drawPixels(pixels, new Position(2, 2));
            });

        this.canvas.drawPixels(DrawingService.drawScrollBar(this.cursor, this.list.length));
    }

    private goToPreviousMenuItem() {
        if (this.cursor - 1 < 0) {
            this.cursor = this.list.length - 1;
        } else {
            this.cursor -= 1;
        }
    }

    private goToNextMenuItem() {
        if (this.cursor + 1 >= this.list.length) {
            this.cursor = 0;
        } else {
            this.cursor += 1;
        }
    }

    private getCurrentItem() {
        return this.list[this.cursor];
    }

    private getStartCursor(key: number): number {
        if (key) {
            return this.list.findIndex((item) => item.key === key);
        }
        const forcedKey = this.list
            .findIndex((item) => {
                if (typeof item.setCursorCondition === 'function') {
                }
                return typeof item.setCursorCondition === 'function' && item.setCursorCondition.apply(this);
            });
        return forcedKey > -1 ? forcedKey : 0;
    }

}
