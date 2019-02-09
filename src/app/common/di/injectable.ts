import 'reflect-metadata';

export function Injectable<T extends { new(...args: any[]): {} }>(constructor: T) {
    // console.log([constructor]);
    // const a = Reflect.getMetadataKeys(constructor);
    // console.log(a);
    // return class extends constructor {
    //     public newProperty = 'new property';
    //     public hello = 'override';
    // };
    // save a reference to the original constructor
}
