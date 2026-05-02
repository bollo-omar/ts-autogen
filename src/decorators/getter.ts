export function Getter() {
    return function (target: any, propertyKey: string) {
        const capitalizedProp = propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);
        const getterName = `get${capitalizedProp}`;

        if (!target[getterName]) {
            target[getterName] = function() {
                return this[propertyKey];
            };
        }

        if (!target._getterProperties) {
            target._getterProperties = new Set();
        }
        target._getterProperties.add(propertyKey);
    };
}
