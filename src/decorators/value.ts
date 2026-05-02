import { ToString } from "./toString";
import { Equals } from "./equals";

export function Value() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        let newConstructor = ToString()(constructor);
        newConstructor = Equals()(newConstructor);

        return class extends newConstructor {
            constructor(...args: any[]) {
                super(...args);

                const propertyNames = new Set<string>();

                let current = this.constructor.prototype;
                while (current && current !== Object.prototype) {
                    Object.getOwnPropertyNames(current).forEach(name => {
                        if (name !== 'constructor' && typeof (this as any)[name] !== 'function') {
                            propertyNames.add(name);
                        }
                    });
                    current = Object.getPrototypeOf(current);
                }

                Object.keys(this).forEach(name => propertyNames.add(name));

                propertyNames.forEach(prop => {
                    const currentValue = (this as any)[prop];
                    Object.defineProperty(this, prop, {
                        value: currentValue,
                        writable: false,
                        enumerable: true,
                        configurable: false
                    });
                });
            }
        } as T;
    };
}
