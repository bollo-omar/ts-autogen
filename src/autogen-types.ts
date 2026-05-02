import type { DataMethods } from "./types";

export type NonFnStringKeys<T> = {
    [K in keyof T]-?: K extends string
        ? T[K] extends (...args: any) => any
            ? never
            : K
        : never;
}[keyof T];

export type GetterMethods<T> = {
    [K in NonFnStringKeys<T> as `get${Capitalize<K>}`]: () => T[K];
};

export type SetterMethods<T> = {
    [K in NonFnStringKeys<T> as `set${Capitalize<K>}`]: (value: T[K]) => void;
};

type BuilderStepKeys<T> = NonFnStringKeys<T> | "build";

export type FluentBuilderFor<T> = {
    [K in BuilderStepKeys<T>]: K extends "build"
        ? () => T
        : (value: T[Extract<K, NonFnStringKeys<T>>]) => FluentBuilderFor<T>;
};

export type AutogenFeatures = {
    readonly builder?: true;
    readonly data?: true;
    readonly getters?: true;
    readonly setters?: true;
    readonly instanceToString?: true;
    readonly instanceEquals?: true;
};

export type AugmentedInstance<T, F extends AutogenFeatures> = T &
    (F extends { data: true }
        ? DataMethods<T> & GetterMethods<T> & SetterMethods<T>
        : {}) &
    (F extends { getters: true }
        ? F extends { data: true }
            ? {}
            : GetterMethods<T>
        : {}) &
    (F extends { setters: true }
        ? F extends { data: true }
            ? {}
            : SetterMethods<T>
        : {}) &
    (F extends { instanceToString: true }
        ? F extends { data: true }
            ? {}
            : { toString(): string }
        : {}) &
    (F extends { instanceEquals: true }
        ? F extends { data: true }
            ? {}
            : { equals(other: T): boolean }
        : {});

type AugmentedForCtor<
    C extends abstract new (...args: any) => any,
    F extends AutogenFeatures
> = AugmentedInstance<InstanceType<C>, F>;

export type AutogenClass<C extends abstract new (...args: any) => any, F extends AutogenFeatures> = C &
    (abstract new (...args: ConstructorParameters<C>) => AugmentedForCtor<C, F>) &
    (F extends { builder: true }
        ? { builder(): FluentBuilderFor<AugmentedForCtor<C, F>> }
        : {});
