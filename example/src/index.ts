import { Data, Builder, ToString, Value } from '@bollo-aggrey/ts-autogen';

// Test @Data decorator
@Data()
class User {
    firstName: string = '';
    lastName: string = '';
    age: number = 0;
}

// Test @Builder decorator
@Builder()
class Product {
    name: string = '';
    price: number = 0;
    category: string = '';
}

// Test @ToString decorator
@ToString()
class SimpleItem {
    id: number = 1;
    name: string = 'test';
}

// Test @Value decorator (immutable)
@Value()
class ImmutableConfig {
    apiUrl: string = 'https://api.example.com';
    timeout: number = 5000;
}

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
    const product = (Product as any).builder()
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
    
    console.log('user.equals(user2):', (user as any).equals(user2));
    
    user2.age = 31;
    console.log('user.equals(user2) after age change:', (user as any).equals(user2));
}

main();
