import {CustomViewInterface} from './custom-view.interface';
import {TextWriter} from '../text-writer';
import {Canvas} from '../canvas';
import {Observable} from 'rxjs/index';
import {ClicksEnum} from '../enums/clicks.enum';
import {DrawingUtils} from '../../modules/menu/utils/drawing.utils';
import {ClickObservable} from '../observables/click-observable';

export interface CustomViewConstructorInterface {
    new(canvas?: Canvas, textWriter?: TextWriter, onClick$?: ClickObservable<ClicksEnum>, drawingUtils?: DrawingUtils): CustomViewInterface;
}
