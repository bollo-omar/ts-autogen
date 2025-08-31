export function Builder() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T): any {
        const ExtendedClass = class extends constructor {
            static builder() {
                const obj: any = {};
                const builder: any = new Proxy({}, {
                    get(_, prop: string) {
                        if (prop === "build") {
                            return () => {
                                // Get property names from metadata stored by property decorators
                                const propertyNames: string[] = [];
                                const proto = constructor.prototype;

                                // Collect properties from getter/setter metadata in order
                                if (proto._getterProperties) {
                                    proto._getterProperties.forEach((prop: string) => {
                                        if (!propertyNames.includes(prop)) {
                                            propertyNames.push(prop);
                                        }
                                    });
                                }
                                if (proto._setterProperties) {
                                    proto._setterProperties.forEach((prop: string) => {
                                        if (!propertyNames.includes(prop)) {
                                            propertyNames.push(prop);
                                        }
                                    });
                                }

                                // If no metadata found, try to get properties from a temporary instance
                                if (propertyNames.length === 0) {
                                    try {
                                        const tempInstance = new constructor();
                                        Object.keys(tempInstance).forEach(key => {
                                            if (!key.startsWith('_') && typeof (tempInstance as any)[key] !== 'function') {
                                                propertyNames.push(key);
                                            }
                                        });
                                    } catch {
                                        // If constructor fails, use the properties from obj
                                        Object.keys(obj).forEach(key => {
                                            if (!propertyNames.includes(key)) {
                                                propertyNames.push(key);
                                            }
                                        });
                                    }
                                }

                                // Always create instance and set properties
                                // This approach works regardless of constructor signature
                                const instance = new ExtendedClass();
                                Object.keys(obj).forEach(key => {
                                    (instance as any)[key] = obj[key];
                                });
                                return instance;
                            };
                        }
                        return (val: any) => {
                            obj[prop] = val;
                            return builder;
                        };
                    }
                });
                return builder;
            }
        };

        // Copy static methods and properties from original constructor
        Object.getOwnPropertyNames(constructor).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype' && name !== 'builder') {
                (ExtendedClass as any)[name] = (constructor as any)[name];
            }
        });

        return ExtendedClass as T;
    };
}
