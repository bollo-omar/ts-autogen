import type { AutogenClass, AutogenFeatures, AugmentedInstance } from "./autogen-types";

export function autogen<C extends abstract new (...args: any) => any, const F extends AutogenFeatures>(
    cls: C,
    features: F
): AutogenClass<C, F>;
export function autogen<C extends abstract new (...args: any) => any>(cls: C): C;
export function autogen(cls: unknown, _features?: AutogenFeatures): unknown {
    return cls;
}

export function autogenDataBuilder<C extends abstract new (...args: any) => any>(
    cls: C
): AutogenClass<C, { readonly builder: true; readonly data: true }> {
    return cls as AutogenClass<C, { readonly builder: true; readonly data: true }>;
}

export function typed<T, const F extends AutogenFeatures>(obj: T, features: F): AugmentedInstance<T, F>;
export function typed<T>(obj: T): T;
export function typed(obj: unknown, _features?: AutogenFeatures): unknown {
    return obj;
}
