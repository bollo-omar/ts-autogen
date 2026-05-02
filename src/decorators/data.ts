import { ToString } from "./toString";
import { Equals } from "./equals";

export function Data() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        let newConstructor = ToString()(constructor);
        newConstructor = Equals()(newConstructor);

        const originalConstructor = newConstructor;
        const ExtendedClass = class extends originalConstructor {
            constructor(...args: any[]) {
                super(...args);

                const propertyNames = new Set<string>();

                const proto = constructor.prototype;
                if (proto._getterProperties) {
                    proto._getterProperties.forEach((prop: string) => propertyNames.add(prop));
                }
                if (proto._setterProperties) {
                    proto._setterProperties.forEach((prop: string) => propertyNames.add(prop));
                }

                Object.keys(this).forEach(name => {
                    if (!name.startsWith('__') && !name.startsWith('_')) {
                        propertyNames.add(name);
                    }
                });

                propertyNames.forEach(prop => {
                    const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
                    const getterName = `get${capitalizedProp}`;
                    const setterName = `set${capitalizedProp}`;

                    if (!(getterName in this)) {
                        (this as any)[getterName] = function() {
                            return (this as any)[prop];
                        };
                    }

                    if (!(setterName in this)) {
                        (this as any)[setterName] = function(value: any) {
                            (this as any)[prop] = value;
                        };
                    }
                });
            }
        };

        Object.getOwnPropertyNames(constructor).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype') {
                (ExtendedClass as any)[name] = (constructor as any)[name];
            }
        });

        (ExtendedClass as any).__lombokGenerated = true;
        (ExtendedClass as any).__originalConstructor = constructor;

        const LombokClass = function(...args: any[]) {
            return new ExtendedClass(...args);
        } as any;

        Object.setPrototypeOf(LombokClass, ExtendedClass);
        Object.getOwnPropertyNames(ExtendedClass).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype') {
                (LombokClass as any)[name] = (ExtendedClass as any)[name];
            }
        });

        LombokClass.prototype = ExtendedClass.prototype;

        return LombokClass;
    };
}
