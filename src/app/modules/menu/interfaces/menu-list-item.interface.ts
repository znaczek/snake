export interface MenuListItemInterface {
    key?: number;
    text: string;
    callback?: () => void;
    visible?: ()=> boolean;
    setCursorCondition?: () => boolean;
}
