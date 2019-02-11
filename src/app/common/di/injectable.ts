import 'reflect-metadata';
import {ClassInterface} from '../interfaces/class.interface';

export function Injectable<T extends ClassInterface>(constructor: T) {
}
