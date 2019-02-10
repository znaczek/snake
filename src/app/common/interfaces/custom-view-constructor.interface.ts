import {CustomViewInterface} from './custom-view.interface';
import {TextWriter} from '../text-writer';
import {Canvas} from '../canvas';
import {ClicksEnum} from '../enums/clicks.enum';
import {ClickObservable} from '../observables/click-observable';
import {DrawingService} from '../../modules/menu/service/drawing.service';

export interface CustomViewConstructorInterface {
    new(canvas?: Canvas, textWriter?: TextWriter, onClick$?: ClickObservable<ClicksEnum>, drawingUtils?: DrawingService): CustomViewInterface;
}
