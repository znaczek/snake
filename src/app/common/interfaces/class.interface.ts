/**
 * Might point to a "class" or an "abstract class"
 */
export interface ClassInterface<T = any> {
    prototype: T;
}
