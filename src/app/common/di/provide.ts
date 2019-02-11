import 'reflect-metadata';
import {ProvideConfigInterface} from '../interfaces/provide-config.interface';
import {ClassInterface} from '../interfaces/class.interface';

export const PROVIDE_CONFIG_KEY = 'di:provide:config';

export function Provide(config: ProvideConfigInterface) {
    return <T extends ClassInterface>(constructor: T) => {
        Reflect.defineMetadata(PROVIDE_CONFIG_KEY, config, constructor);
    };
}
