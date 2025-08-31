// Helper types and functions for better TypeScript support

// Type that adds generated methods to a class
export type WithLombokMethods<T> = T & {
    // Generated getter methods
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
    // Generated setter methods  
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
} & {
    // ToString and Equals methods
    toString(): string;
    equals(other: T): boolean;
};

// Type for classes with builder pattern
export type WithBuilder<T> = {
    new(...args: any[]): WithLombokMethods<T>;
    builder(): {
        [K in keyof T]: (value: T[K]) => any;
    } & {
        build(): WithLombokMethods<T>;
    };
};

// Helper function to cast a class to include Lombok methods
export function lombok<T>(ClassConstructor: new(...args: any[]) => T): WithBuilder<T> {
    return ClassConstructor as any;
}

// Alternative: Create a decorator that provides proper typing
export function LombokClass<T extends new(...args: any[]) => any>(constructor: T) {
    return constructor as T & {
        new(...args: any[]): InstanceType<T> & {
            [K in keyof InstanceType<T> as `get${Capitalize<string & K>}`]: () => InstanceType<T>[K];
        } & {
            [K in keyof InstanceType<T> as `set${Capitalize<string & K>}`]: (value: InstanceType<T>[K]) => void;
        } & {
            toString(): string;
            equals(other: InstanceType<T>): boolean;
        };
        builder(): {
            [K in keyof InstanceType<T>]: (value: InstanceType<T>[K]) => any;
        } & {
            build(): InstanceType<T>;
        };
    };
}
