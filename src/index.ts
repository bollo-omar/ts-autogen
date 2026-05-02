export { Getter } from "./decorators/getter";
export { Setter } from "./decorators/setter";
export { ToString } from "./decorators/toString";
export { Equals } from "./decorators/equals";
export { Builder } from "./decorators/builder";
export { Data } from "./decorators/data";
export {
    NoArgsConstructor,
    AllArgsConstructor,
    RequiredArgsConstructor
} from "./decorators/constructors";
export { Value } from "./decorators/value";

export { autogen, autogenDataBuilder, typed } from "./autogen";

export type {
    AutogenFeatures,
    AutogenClass,
    AugmentedInstance,
    FluentBuilderFor,
    NonFnStringKeys,
    GetterMethods as AutogenGetterMethods,
    SetterMethods as AutogenSetterMethods
} from "./autogen-types";

export { autogen as default } from "./autogen";

export { checkForUpdates, getVersionInfo } from "./utils/version-checker";

import { notifyIfUpdateAvailable } from "./utils/version-checker";
notifyIfUpdateAvailable();

export type {
    DataMethods,
    GetterMethods,
    SetterMethods,
    BuilderPattern,
    Builder as BuilderType,
    AllArgsConstructor as AllArgsConstructorType,
    WithData,
    WithBuilder,
    WithAllArgsConstructor,
    LombokStyle
} from "./types";
