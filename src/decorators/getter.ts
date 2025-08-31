export function Getter() {
    return function (target: any, propertyKey: string) {
        const capitalizedProp = propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);
        const getterName = `get${capitalizedProp}`;

        // Add getter method to prototype if it doesn't exist
        if (!target[getterName]) {
            target[getterName] = function() {
                return this[propertyKey];
            };
        }

        // Mark this property as having a getter for other decorators to know
        if (!target._getterProperties) {
            target._getterProperties = new Set();
        }
        target._getterProperties.add(propertyKey);
    };
}
