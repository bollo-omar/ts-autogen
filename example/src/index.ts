import { Data, Builder, ToString, Value, autogen } from '@bollo-aggrey/ts-autogen';

// Test @Data decorator
@Data()
class UserClass {
    firstName: string = '';
    lastName: string = '';
    age: number = 0;
}
// Enable TypeScript support with autogen
const User = autogen(UserClass);

// Test @Builder decorator
@Builder()
class ProductClass {
    name: string = '';
    price: number = 0;
    category: string = '';
}
// Enable TypeScript support with autogen
const Product = autogen(ProductClass);

// Test @ToString decorator
@ToString()
class SimpleItemClass {
    id: number = 1;
    name: string = 'test';
}
// Enable TypeScript support with autogen
const SimpleItem = autogen(SimpleItemClass);

// Test @Value decorator (immutable)
@Value()
class ImmutableConfigClass {
    apiUrl: string = 'https://api.example.com';
    timeout: number = 5000;
}
// Enable TypeScript support with autogen
const ImmutableConfig = autogen(ImmutableConfigClass);

function main() {
    console.log('=== Testing @Data decorator ===');
    const user = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.age = 30;

    console.log('User:', user.toString());
    console.log('User firstName:', user.firstName);
    console.log('User lastName:', user.lastName);
    console.log('User age:', user.age);

    console.log('\n=== Testing @Builder decorator ===');
    const product = Product.builder()
        .name('Laptop')
        .price(999.99)
        .category('Electronics')
        .build();

    console.log('Product:', product);
    console.log('Product name:', product.name);
    console.log('Product price:', product.price);
    console.log('Product category:', product.category);

    console.log('\n=== Testing @ToString decorator ===');
    const item = new SimpleItem();
    console.log('Item toString:', item.toString());

    console.log('\n=== Testing @Value decorator ===');
    const config = new ImmutableConfig();
    console.log('Config:', config.toString());
    console.log('Config apiUrl:', config.apiUrl);
    console.log('Config timeout:', config.timeout);

    // Try to modify an immutable object (should not work)
    try {
        (config as any).apiUrl = 'https://hacker.com';
        console.log('WARNING: Immutable object was modified!');
    } catch (error) {
        console.log('Good: Immutable object cannot be modified');
    }

    console.log('\n=== Testing equality ===');
    const user2 = new User();
    user2.firstName = 'John';
    user2.lastName = 'Doe';
    user2.age = 30;

    console.log('user.equals(user2):', user.equals(user2));

    user2.age = 31;
    console.log('user.equals(user2) after age change:', user.equals(user2));
}

main();
