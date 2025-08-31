import {AllArgsConstructor, Builder, Data, Getter, Setter, autogen} from "@bollo-aggrey/ts-autogen";

// Test without any manual method declarations
@Data()
@Builder()
@AllArgsConstructor()
class TrueProductClass {
    @Getter()
    @Setter()
    name: string = '';

    @Getter()
    @Setter()
    price: number = 0;
}

// Enable TypeScript support with autogen
export const TrueProduct = autogen(TrueProductClass);

// Test the actual runtime behavior
const product = TrueProduct.builder()
    .name('Test Laptop')
    .price(1299.99)
    .build();

console.log('=== True Test (no manual method declarations) ===');
console.log('Product from builder:', product);
console.log('Product name:', product.name);
console.log('Product price:', product.price);

// Test if getter methods actually exist
console.log('Has getName method:', typeof product.getName === 'function');
console.log('Has setName method:', typeof product.setName === 'function');

if (typeof product.getName === 'function') {
    console.log('getName() result:', product.getName());
} else {
    console.log('getName() method does NOT exist');
}

if (typeof product.setName === 'function') {
    product.setName('Updated Laptop');
    console.log('After setName:', product.name);
} else {
    console.log('setName() method does NOT exist');
}

console.log('toString() result:', product.toString());
