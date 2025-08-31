export function ToString() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            toString() {
                // Only include non-private properties (not starting with __)
                const entries = Object.entries(this)
                    .filter(([k, v]) => !k.startsWith('__') && typeof v !== 'function')
                    .map(([k, v]) => `${k}=${v}`);
                return `${constructor.name}{${entries.join(", ")}}`;
            }
        } as T;
    };
}
