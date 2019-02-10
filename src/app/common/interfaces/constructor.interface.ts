export interface ConstructorInterface {
    new (...args: any[]): any;
}

export type Constructor<T> = {prototype: T};
