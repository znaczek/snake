import {ClassInterface} from './class.interface';

export interface ConstructorInterface<T = any> extends ClassInterface<T> {
    new (...args: any[]): T;
}
