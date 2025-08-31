export function Setter() {
    return function (target: any, propertyKey: string) {
        const capitalizedProp = propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);
        const setterName = `set${capitalizedProp}`;

        // Add setter method to prototype if it doesn't exist
        if (!target[setterName]) {
            target[setterName] = function(value: any) {
                this[propertyKey] = value;
            };
        }

        // Mark this property as having a setter for other decorators to know
        if (!target._setterProperties) {
            target._setterProperties = new Set();
        }
        target._setterProperties.add(propertyKey);
    };
}
