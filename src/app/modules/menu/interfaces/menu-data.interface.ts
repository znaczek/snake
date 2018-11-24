export interface MenuDataInterface {
    text: string;
    ordinal: number;
    callback?: string;
    callbackArgs?: {[index: string]: any};
    children?: MenuDataInterface[];
}
