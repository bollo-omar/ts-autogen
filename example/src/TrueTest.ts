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
class TrueProductClass {
    @Getter()
    @Setter()
    name: string = '';

    @Getter()
    @Setter()
    price: number = 0;
}

export const TrueProduct = autogenDataBuilder(TrueProductClass);

const product = TrueProduct.builder()
    .name('Test Laptop')
    .price(1299.99)
    .build();

console.log('=== True Test (no manual method declarations) ===');
console.log('Product from builder:', product);
console.log('Product name:', product.name);
console.log('Product price:', product.price);

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
