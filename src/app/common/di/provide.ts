import 'reflect-metadata';
import {ConstructorInterface} from '../interfaces/constructor.interface';
import {ProvideConfigInterface} from '../interfaces/provide-config.interface';

export const PROVIDE_CONFIG_KEY = 'di:provide:config';

export function Provide(config: ProvideConfigInterface) {
    return <T extends ConstructorInterface>(constructor: T) => {
        Reflect.defineMetadata(PROVIDE_CONFIG_KEY, config, constructor);
    };
}
