import {CustomViewInterface} from './custom-view.interface';
import {TextWriter} from '../../../common/text-writer';
import {Canvas} from '../../../common/canvas';
import {Observable} from 'rxjs/index';
import {ClicksEnum} from '../../../common/enums/clicks.enum';
import {DrawingUtils} from '../utils/drawing.utils';

export interface CustomViewConstructorInterface {
    new(canvas: Canvas, textWriter: TextWriter, onClick: Observable<ClicksEnum>, drawingUtils: DrawingUtils): CustomViewInterface;
}
