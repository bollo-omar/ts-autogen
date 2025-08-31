export function Equals() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            equals(other: any) {
                if (!other || other.constructor !== this.constructor) return false;

                // Compare only non-private properties (not starting with __)
                const thisKeys = Object.keys(this).filter(k => !k.startsWith('__') && typeof (this as any)[k] !== 'function');
                const otherKeys = Object.keys(other).filter(k => !k.startsWith('__') && typeof (other as any)[k] !== 'function');

                if (thisKeys.length !== otherKeys.length) return false;

                return thisKeys.every(k => (this as any)[k] === (other as any)[k]);
            }
        } as T;
    };
}
