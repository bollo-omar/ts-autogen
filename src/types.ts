export interface DataMethods<T> {
    toString(): string;
    equals(other: T): boolean;
}

export interface GetterMethods {
    [key: string]: () => any;
}

export interface SetterMethods {
    [key: string]: (value: any) => void;
}

export interface BuilderPattern<T> {
    builder(): Builder<T>;
}

export interface Builder<T> {
    build(): T;
    [key: string]: any;
}

export interface AllArgsConstructor<T> {
    new(...args: any[]): T;
}

export type WithData<T> = T & DataMethods<T> & GetterMethods & SetterMethods;
export type WithBuilder<T> = T & { constructor: BuilderPattern<T> };
export type WithAllArgsConstructor<T> = T & { constructor: AllArgsConstructor<T> };

export type LombokStyle<T> = WithData<T> & WithBuilder<T> & WithAllArgsConstructor<T>;
