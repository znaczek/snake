import {OrientationEnum} from '../enums/orientation.enum';

export class WindowParams {
    public width: number;
    public height: number;
    public orientation: OrientationEnum;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.orientation = height > width ? OrientationEnum.VERTICAL : OrientationEnum.HORIONTAL;
    }
}
