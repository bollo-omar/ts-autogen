import { ToString } from "./toString";
import { Equals } from "./equals";

export function Data() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        // Apply ToString and Equals decorators
        let newConstructor = ToString()(constructor);
        newConstructor = Equals()(newConstructor);

        // Add getters and setters for all properties
        const originalConstructor = newConstructor;
        const ExtendedClass = class extends originalConstructor {
            constructor(...args: any[]) {
                super(...args);

                // Get property names from metadata stored by property decorators
                const propertyNames = new Set<string>();

                // Get properties from _getterProperties and _setterProperties metadata
                const proto = constructor.prototype;
                if (proto._getterProperties) {
                    proto._getterProperties.forEach((prop: string) => propertyNames.add(prop));
                }
                if (proto._setterProperties) {
                    proto._setterProperties.forEach((prop: string) => propertyNames.add(prop));
                }

                // Also get properties from instance (for properties with initial values)
                Object.keys(this).forEach(name => {
                    if (!name.startsWith('__') && !name.startsWith('_')) {
                        propertyNames.add(name);
                    }
                });

                // Create getter and setter methods for each property
                propertyNames.forEach(prop => {
                    const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
                    const getterName = `get${capitalizedProp}`;
                    const setterName = `set${capitalizedProp}`;

                    // Add getter method if it doesn't exist
                    if (!(getterName in this)) {
                        (this as any)[getterName] = function() {
                            return (this as any)[prop];
                        };
                    }

                    // Add setter method if it doesn't exist
                    if (!(setterName in this)) {
                        (this as any)[setterName] = function(value: any) {
                            (this as any)[prop] = value;
                        };
                    }
                });
            }
        };

        // Copy static methods and properties
        Object.getOwnPropertyNames(constructor).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype') {
                (ExtendedClass as any)[name] = (constructor as any)[name];
            }
        });

        // Add type information for better IDE support
        (ExtendedClass as any).__lombokGenerated = true;
        (ExtendedClass as any).__originalConstructor = constructor;

        // Automatically apply the lombok wrapper to handle TypeScript typing
        const LombokClass = function(...args: any[]) {
            return new ExtendedClass(...args);
        } as any;

        // Copy all static methods and properties to the wrapper
        Object.setPrototypeOf(LombokClass, ExtendedClass);
        Object.getOwnPropertyNames(ExtendedClass).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype') {
                (LombokClass as any)[name] = (ExtendedClass as any)[name];
            }
        });

        // Set the prototype so instanceof works correctly
        LombokClass.prototype = ExtendedClass.prototype;

        return LombokClass;
    };
}
