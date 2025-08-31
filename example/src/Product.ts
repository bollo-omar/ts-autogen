import {
    AllArgsConstructor,
    Builder,
    Data,
    Getter,
    Setter,
    autogen
} from "@bollo-aggrey/ts-autogen";

/**
 * Product class demonstrating clean Lombok-style decorators
 *
 * @Data - Generates getters, setters, toString, and equals methods
 * @Builder - Generates fluent builder pattern
 * @AllArgsConstructor - Generates constructor accepting all properties
 */
@Data()
@Builder()
@AllArgsConstructor()
class ProductClass {
    @Getter()
    @Setter()
    name: string = '';

    @Getter()
    @Setter()
    price: number = 0;

    @Getter()
    @Setter()
    category: string = '';

    @Getter()
    @Setter()
    quantity: number = 0;

    @Getter()
    @Setter()
    description: string = '';

    /**
     * Custom business method - works alongside generated methods
     */
    public save(): string {
        return `Saved product: ${this.name}`;
    }

    /**
     * Custom validation method
     */
    public isValid(): boolean {
        return this.name.length > 0 && this.price > 0;
    }
}

// Enable TypeScript support with one line - abstracts all type casting!
export const Product = autogen(ProductClass);

// ===== USAGE EXAMPLES =====

console.log('🚀 TypeScript Lombok-style Decorators Demo\n');

// 1. Create instance using no-args constructor
const emptyProduct = new Product();
console.log('1. Empty product:', emptyProduct.toString());

// 2. Use fluent builder pattern - CLEAN API!
const laptopProduct = Product.builder()
    .name('MacBook Pro')
    .price(2499.99)
    .category('Electronics')
    .quantity(5)
    .description('High-performance laptop for developers')
    .build();

console.log('2. Product from builder:', laptopProduct.toString());
console.log('   Builder product name:', laptopProduct.getName());

// 3. Use all-args constructor - CLEAN API!
const phoneProduct = new Product(
    'iPhone 15',
    999.99,
    'Electronics',
    10,
    'Latest smartphone'
);

console.log('3. Product from constructor:', phoneProduct.toString());

// 4. Use generated setter methods - CLEAN API!
phoneProduct.setPrice(899.99);
phoneProduct.setQuantity(15);

console.log('4. After using setters:', phoneProduct.toString());

// 5. Use generated getter methods - CLEAN API!
console.log('5. Using getters:');
console.log(`   Name: ${phoneProduct.getName()}`);
console.log(`   Price: $${phoneProduct.getPrice()}`);
console.log(`   Category: ${phoneProduct.getCategory()}`);

// 6. Test custom methods
console.log('6. Custom methods:');
console.log(`   Save result: ${phoneProduct.save()}`);
console.log(`   Is valid: ${phoneProduct.isValid()}`);

// 7. Test equals method - CLEAN API!
const duplicatePhone = new Product(
    'iPhone 15',
    899.99,
    'Electronics',
    15,
    'Latest smartphone'
);

console.log('7. Equality test:');
console.log(`   Products equal: ${phoneProduct.equals(duplicatePhone)}`);

console.log('\n✅ All Lombok-style features working perfectly!');
