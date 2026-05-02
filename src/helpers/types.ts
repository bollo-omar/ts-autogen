export type WithLombokMethods<T> = T & {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
} & {
    toString(): string;
    equals(other: T): boolean;
};

export type WithBuilder<T> = {
    new(...args: any[]): WithLombokMethods<T>;
    builder(): {
        [K in keyof T]: (value: T[K]) => any;
    } & {
        build(): WithLombokMethods<T>;
    };
};

export function lombok<T>(ClassConstructor: new(...args: any[]) => T): WithBuilder<T> {
    return ClassConstructor as any;
}

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
