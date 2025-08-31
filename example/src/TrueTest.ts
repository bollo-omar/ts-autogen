import {AllArgsConstructor, Builder, Data, Getter, Setter} from "@bollo-aggrey/ts-autogen";

// Test without any manual method declarations
@Data()
@Builder()
@AllArgsConstructor()
export class TrueProduct {
    @Getter()
    @Setter()
    name: string = '';
    
    @Getter()
    @Setter()
    price: number = 0;
}

// Test the actual runtime behavior
const product = (TrueProduct as any).builder()
    .name('Test Laptop')
    .price(1299.99)
    .build();

console.log('=== True Test (no manual method declarations) ===');
console.log('Product from builder:', product);
console.log('Product name:', product.name);
console.log('Product price:', product.price);

// Test if getter methods actually exist
console.log('Has getName method:', typeof (product as any).getName === 'function');
console.log('Has setName method:', typeof (product as any).setName === 'function');

if (typeof (product as any).getName === 'function') {
    console.log('getName() result:', (product as any).getName());
} else {
    console.log('getName() method does NOT exist');
}

if (typeof (product as any).setName === 'function') {
    (product as any).setName('Updated Laptop');
    console.log('After setName:', product.name);
} else {
    console.log('setName() method does NOT exist');
}

console.log('toString() result:', product.toString());
