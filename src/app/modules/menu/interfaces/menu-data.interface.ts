export interface MenuDataInterface {
    text: string;
    ordinal: number;
    callback?: () => void;
    back?: boolean;
    callbackArgs?: {[index: string]: any};
    children?: MenuDataInterface[];
}
