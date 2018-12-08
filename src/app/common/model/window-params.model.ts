import {OrientationEnum} from '../enums/orientation.enum';

export class WindowParams {

    public orientation: OrientationEnum;

    constructor(public width: number, public height: number) {
        this.orientation = height > width ? OrientationEnum.VERTICAL : OrientationEnum.HORIONTAL;
    }

    public get isHorizontal() {
        return this.orientation === OrientationEnum.HORIONTAL;
    }
}
