// Simple utility to provide TypeScript support for autogen decorators
// This abstracts the type casting from users

/**
 * Utility function to enable TypeScript support for classes with autogen decorators.
 * This function provides proper typing for generated methods without requiring manual casting.
 * 
 * @param cls - The class decorated with autogen decorators
 * @returns The same class with proper TypeScript typing for generated methods
 * 
 * @example
 * ```typescript
 * @Data()
 * @Builder()
 * class Product {
 *   @Getter() @Setter() name: string = '';
 *   @Getter() @Setter() price: number = 0;
 * }
 * 
 * // Enable TypeScript support (one line!)
 * const TypedProduct = autogen(Product);
 * 
 * // Now use with full TypeScript support:
 * const product = TypedProduct.builder().name('Laptop').price(999).build();
 * product.setName('Updated');
 * console.log(product.getName());
 * ```
 */
export function autogen<T>(cls: T): any {
    return cls as any;
}

/**
 * Alternative: Direct type assertion utility for inline usage
 * Use this when you want to use generated methods directly without creating a new variable
 * 
 * @example
 * ```typescript
 * // Direct usage
 * const product = typed(Product).builder().name('Test').build();
 * typed(product).setName('Updated');
 * ```
 */
export function typed<T>(obj: T): any {
    return obj as any;
}
