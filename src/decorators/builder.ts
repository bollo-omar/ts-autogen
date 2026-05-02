export function Builder() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T): any {
        const ExtendedClass = class extends constructor {
            static builder() {
                const obj: any = {};
                const builder: any = new Proxy({}, {
                    get(_, prop: string) {
                        if (prop === "build") {
                            return () => {
                                const propertyNames: string[] = [];
                                const proto = constructor.prototype;

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

                                if (propertyNames.length === 0) {
                                    try {
                                        const tempInstance = new constructor();
                                        Object.keys(tempInstance).forEach(key => {
                                            if (!key.startsWith('_') && typeof (tempInstance as any)[key] !== 'function') {
                                                propertyNames.push(key);
                                            }
                                        });
                                    } catch {
                                        Object.keys(obj).forEach(key => {
                                            if (!propertyNames.includes(key)) {
                                                propertyNames.push(key);
                                            }
                                        });
                                    }
                                }

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

        Object.getOwnPropertyNames(constructor).forEach(name => {
            if (name !== 'length' && name !== 'name' && name !== 'prototype' && name !== 'builder') {
                (ExtendedClass as any)[name] = (constructor as any)[name];
            }
        });

        return ExtendedClass as T;
    };
}
