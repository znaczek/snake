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

    public resolve<T extends {}>(cls: ConstructorInterface<T>): T {
        const dependenciesMeta = this.getDependenciesMetaRecursive(cls);
        const dependencies = (dependenciesMeta || []).map((depth) => {
            return this.resolve(depth);
        });
        const qualifier = Injector.getQualifier(cls);

        const provideConfig = this.getMostRecentProvide(cls);
        if (!provideConfig || provideConfig.singleton) {
            const existingDependency = this.dependencies[qualifier];
            if (existingDependency) {
                return existingDependency;
            }
        }

        const dependency = <T>{};
        // @ts-ignore
        dependency.__proto__ = cls.prototype;

        cls.apply(dependency, dependencies);
        this.dependencies[qualifier] = dependency;
        return dependency;
    }

    public provide<T extends object>(cls: ConstructorInterface<T>, object: T): void {
        const qualifier = Injector.getQualifier(cls);
        const existingDependency = this.dependencies[qualifier];
        if (existingDependency) {
            throw new Error('Dependency for class "' + cls.name + '" already exists.');
        }
        this.dependencies[qualifier] = object;
    }

    private getMostRecentProvide(cls: ConstructorInterface): ProvideConfigInterface {
        const provide = <ProvideConfigInterface>Reflect.getMetadata(PROVIDE_CONFIG_KEY, cls);
        if (!provide && cls.prototype) {
            return this.getMostRecentProvide(cls.prototype);
        }
        return provide;
    }

    private getDependenciesMetaRecursive(cls: ConstructorInterface): ConstructorInterface[] {
        const dependencies = <ConstructorInterface[]>Reflect.getMetadata(Injector.METADATA, cls) || [];
        return !cls.prototype ? dependencies : dependencies.concat(this.getDependenciesMetaRecursive(cls.prototype));
    }

}
