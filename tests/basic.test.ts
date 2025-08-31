import { Data, Builder, ToString, Getter, Setter, Value } from '../src/index';

// Test basic @Data decorator
@Data()
class User {
    firstName: string = '';
    lastName: string = '';
    age: number = 0;
}

// Test @Builder decorator
@Builder()
class Product {
    @Getter()
    name: string = '';

    @Getter()
    price: number = 0;
}

// Test @ToString decorator
@ToString()
class SimpleClass {
    name: string = 'test';
    value: number = 42;
}

describe('TypeScript Autogen Tests', () => {
    test('@Data decorator should work', () => {
        const user = new User();
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.age = 30;

        expect(user.firstName).toBe('John');
        expect(user.lastName).toBe('Doe');
        expect(user.age).toBe(30);
        expect(user.toString()).toContain('John');
        expect(user.toString()).toContain('Doe');
        expect(user.toString()).toContain('30');
    });

    test('@Builder decorator should work', () => {
        const product = (Product as any).builder()
            .name('Laptop')
            .price(999.99)
            .build();

        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(999.99);
    });

    test('@ToString decorator should work', () => {
        const obj = new SimpleClass();
        expect(obj.toString()).toContain('test');
        expect(obj.toString()).toContain('42');
    });

    test('Property decorators should work', () => {
        class TestClass {
            @Getter()
            @Setter()
            testProp: string = '';
        }

        const instance = new TestClass();
        instance.testProp = 'hello';
        expect(instance.testProp).toBe('hello');
    });
});
