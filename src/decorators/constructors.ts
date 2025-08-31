export function NoArgsConstructor() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super();
            }
        } as T;
    };
}

export function AllArgsConstructor() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super();

                // Get property names from metadata stored by property decorators
                const propertyNames: string[] = [];
                const proto = constructor.prototype;

                // Collect properties from getter/setter metadata
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

                // If first argument is an object, assign its properties
                if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
                    Object.assign(this, args[0]);
                } else {
                    // Otherwise, assign args to properties in order
                    propertyNames.forEach((prop, index) => {
                        if (index < args.length) {
                            (this as any)[prop] = args[index];
                        }
                    });
                }
            }
        } as T;
    };
}

export function RequiredArgsConstructor() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super();

                // Get required properties (non-optional, non-undefined)
                const instance = new constructor();
                const requiredProps = Object.getOwnPropertyNames(instance).filter(prop => {
                    const value = (instance as any)[prop];
                    return value !== undefined && value !== null;
                });

                // If first argument is an object, assign its properties
                if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
                    Object.assign(this, args[0]);
                } else {
                    // Otherwise, assign args to required properties in order
                    requiredProps.forEach((prop, index) => {
                        if (index < args.length) {
                            (this as any)[prop] = args[index];
                        }
                    });
                }
            }
        } as T;
    };
}
