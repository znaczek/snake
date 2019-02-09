import 'reflect-metadata';
import {Utils} from '../utils/utils';
import {PROVIDE_CONFIG_KEY} from './provide';
import {ConstructorInterface} from '../interfaces/constructor.interface';
import {ProvideConfigInterface} from '../interfaces/provide-config.interface';



export class Injector {
    private static readonly METADATA = 'design:paramtypes';

    private static getQualifier(cls: ConstructorInterface) {
        let str = '';
        for (const key in cls.prototype) {
            if (cls.prototype.hasOwnProperty(key)) {
                str += key;
            }
        }
        return cls.name + Utils.hashCode(str);
    }

    private dependencies: { [key: string]: any } = {};

    constructor() {
        // @ts-ignore
        window.ld = () => console.log(this.dependencies);
    }

    public resolve(cls: ConstructorInterface): any {
        const dependenciesMeta = <ConstructorInterface[]>Reflect.getMetadata(Injector.METADATA, cls);
        const dependencies = (dependenciesMeta || []).map((depth) => {
            return this.resolve(depth);
        });
        const qualifier = Injector.getQualifier(cls);

        const provideConfig = <ProvideConfigInterface>Reflect.getMetadata(PROVIDE_CONFIG_KEY, cls);
        if (!provideConfig || provideConfig.singleton) {
            const existingDependency = this.dependencies[qualifier];
            if (existingDependency) {
                return existingDependency;
            }
        }

        const dependency = {};
        // @ts-ignore
        dependency.__proto__ = cls.prototype;

        cls.apply(dependency, dependencies);
        this.dependencies[qualifier] = dependency;
        return dependency;
    }

    public provide(cls: ConstructorInterface, object: any): any {
        const qualifier = Injector.getQualifier(cls);
        const existingDependency = this.dependencies[qualifier];
        if (existingDependency) {
            throw new Error('Dependency for class "' + cls.name + '" already exists.');
        }
        this.dependencies[qualifier] = object;
    }

}
