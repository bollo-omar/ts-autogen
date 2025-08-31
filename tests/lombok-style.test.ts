import { Data, Builder, AllArgsConstructor, Getter } from '../src/index';

// Test the Lombok-style usage pattern
@Data()
@Builder()
@AllArgsConstructor()
class Product {
    @Getter()
    name: string;
    
    @Getter()
    price: number;
    
    @Getter()
    category: string;
    
    @Getter()
    quantity: number;
    
    @Getter()
    description: string;
}

describe('Lombok-style Usage Tests', () => {
    test('AllArgsConstructor should work', () => {
        const product = new Product('Laptop', 999.99, 'Electronics', 10, 'High-performance laptop');
        
        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(999.99);
        expect(product.category).toBe('Electronics');
        expect(product.quantity).toBe(10);
        expect(product.description).toBe('High-performance laptop');
    });
    
    test('Data decorator should provide setters', () => {
        const product = new Product('Laptop', 999.99, 'Electronics', 10, 'High-performance laptop');
        
        // Test setter methods from @Data
        (product as any).setName('Laptop 2');
        (product as any).setPrice(1000.99);
        (product as any).setCategory('Electronics 2');
        (product as any).setQuantity(11);
        (product as any).setDescription('High-performance laptop 2');
        
        expect(product.name).toBe('Laptop 2');
        expect(product.price).toBe(1000.99);
        expect(product.category).toBe('Electronics 2');
        expect(product.quantity).toBe(11);
        expect(product.description).toBe('High-performance laptop 2');
    });
    
    test('Getter decorators should provide getter methods', () => {
        const product = new Product('Laptop', 999.99, 'Electronics', 10, 'High-performance laptop');
        
        // Test getter methods from @Getter
        expect((product as any).getName()).toBe('Laptop');
        expect((product as any).getPrice()).toBe(999.99);
        expect((product as any).getCategory()).toBe('Electronics');
        expect((product as any).getQuantity()).toBe(10);
        expect((product as any).getDescription()).toBe('High-performance laptop');
    });
    
    test('Builder should work with AllArgsConstructor', () => {
        const product = (Product as any).builder()
            .name('Laptop')
            .price(999.99)
            .category('Electronics')
            .quantity(10)
            .description('High-performance laptop')
            .build();
        
        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(999.99);
        expect(product.category).toBe('Electronics');
        expect(product.quantity).toBe(10);
        expect(product.description).toBe('High-performance laptop');
    });
    
    test('toString should work', () => {
        const product = new Product('Laptop', 999.99, 'Electronics', 10, 'High-performance laptop');
        const str = product.toString();
        
        expect(str).toContain('Laptop');
        expect(str).toContain('999.99');
        expect(str).toContain('Electronics');
        expect(str).toContain('10');
        expect(str).toContain('High-performance laptop');
    });
});
