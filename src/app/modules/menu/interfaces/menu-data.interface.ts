export interface MenuDataInterface {
    text: string;
    ordinal: number;
    callback?: () => void;
    setCursorCondition?: () => boolean;
    back?: boolean;
    callbackArgs?: {[index: string]: any};
    children?: MenuDataInterface[];
}
