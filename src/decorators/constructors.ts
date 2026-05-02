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

                if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
                    Object.assign(this, args[0]);
                } else {
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

                const instance = new constructor();
                const requiredProps = Object.getOwnPropertyNames(instance).filter(prop => {
                    const value = (instance as any)[prop];
                    return value !== undefined && value !== null;
                });

                if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
                    Object.assign(this, args[0]);
                } else {
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
