import { ToString } from "./toString";
import { Equals } from "./equals";

export function Value() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        // Apply ToString and Equals decorators
        let newConstructor = ToString()(constructor);
        newConstructor = Equals()(newConstructor);

        // Create a new class that makes properties read-only
        return class extends newConstructor {
            constructor(...args: any[]) {
                super(...args);

                // Get all property names
                const propertyNames = new Set<string>();

                // Get properties from prototype chain
                let current = this.constructor.prototype;
                while (current && current !== Object.prototype) {
                    Object.getOwnPropertyNames(current).forEach(name => {
                        if (name !== 'constructor' && typeof (this as any)[name] !== 'function') {
                            propertyNames.add(name);
                        }
                    });
                    current = Object.getPrototypeOf(current);
                }

                // Get properties from instance
                Object.keys(this).forEach(name => propertyNames.add(name));

                // Make all properties read-only
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
