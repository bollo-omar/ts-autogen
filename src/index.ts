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

// Export TypeScript utilities
export { autogen, typed } from "./autogen";

// Default export for backward compatibility
export { autogen as default } from "./autogen";

// Export version utilities
export { checkForUpdates, getVersionInfo } from "./utils/version-checker";

// Auto-check for updates (non-blocking)
import { notifyIfUpdateAvailable } from "./utils/version-checker";
notifyIfUpdateAvailable();

// Export types
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


