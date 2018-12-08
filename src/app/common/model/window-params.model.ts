import {OrientationEnum} from '../enums/orientation.enum';

export class WindowParams {
    public orientation: OrientationEnum;

    private originalWidth: number;
    private originalHeight: number;

    constructor(width: number, height: number) {
        this.originalWidth = width;
        this.originalHeight = height;
        this.orientation = height > width ? OrientationEnum.VERTICAL : OrientationEnum.HORIONTAL;
    }

    public get height() {
        return this.isHorizontal ? this.originalWidth : this.originalHeight;
    }

    public get width() {
        return this.isHorizontal ? this.originalHeight : this.originalWidth;
    }

    public get isHorizontal() {
        return this.orientation === OrientationEnum.HORIONTAL;
    }
}
