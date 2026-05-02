import {
    AllArgsConstructor,
    Builder,
    Data,
    Getter,
    Setter,
    autogenDataBuilder
} from "@bollo-aggrey/ts-autogen";

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

    public save(): string {
        return `Saved product: ${this.name}`;
    }

    public isValid(): boolean {
        return this.name.length > 0 && this.price > 0;
    }
}

export const Product = autogenDataBuilder(ProductClass);

console.log('🚀 TypeScript Lombok-style Decorators Demo\n');

const emptyProduct = new Product();
console.log('1. Empty product:', emptyProduct.toString());

const laptopProduct = Product.builder()
    .name('MacBook Pro')
    .price(1999.99)
    .category('Electronics')
    .quantity(10)
    .description('Powerful laptop for professionals')
    .build();

console.log('2. Product from builder:', laptopProduct.toString());
console.log('   Builder product name:', laptopProduct.getName());

const phoneProduct = new Product(
    'iPhone 15',
    999.99,
    'Electronics',
    10,
    'Latest smartphone'
);

console.log('3. Product from constructor:', phoneProduct.toString());

phoneProduct.setPrice(899.99);
phoneProduct.setQuantity(15);

console.log('4. After using setters:', phoneProduct.toString());

console.log('5. Using getters:');
console.log(`   Name: ${phoneProduct.getName()}`);
console.log(`   Price: $${phoneProduct.getPrice()}`);
console.log(`   Category: ${phoneProduct.getCategory()}`);

console.log('6. Custom methods:');
console.log(`   Save result: ${phoneProduct.save()}`);
console.log(`   Is valid: ${phoneProduct.isValid()}`);

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
