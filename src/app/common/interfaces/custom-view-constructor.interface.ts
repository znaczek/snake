import {CustomViewInterface} from './custom-view.interface';
import {TextWriter} from '../text-writer';
import {Canvas} from '../canvas';
import {Observable} from 'rxjs/index';
import {ClicksEnum} from '../enums/clicks.enum';
import {DrawingUtils} from '../../modules/menu/utils/drawing.utils';

export interface CustomViewConstructorInterface {
    new(canvas?: Canvas, textWriter?: TextWriter, onClick?: Observable<ClicksEnum>, drawingUtils?: DrawingUtils): CustomViewInterface;
}
