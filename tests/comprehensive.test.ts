import { 
    Data, 
    Builder, 
    AllArgsConstructor, 
    NoArgsConstructor, 
    RequiredArgsConstructor,
    Getter, 
    Setter, 
    ToString, 
    Equals, 
    Value 
} from '../src/index';

describe('Comprehensive Decorator Tests', () => {
    
    // Test NoArgsConstructor
    describe('@NoArgsConstructor', () => {
        @NoArgsConstructor()
        class NoArgsClass {
            @Getter()
            name: string = 'default';
            @Getter()
            value: number = 42;
        }
        
        test('should create instance with no arguments', () => {
            const instance = new (NoArgsClass as any)();
            expect(instance.name).toBe('default');
            expect(instance.value).toBe(42);
        });
    });
    
    // Test AllArgsConstructor
    describe('@AllArgsConstructor', () => {
        @AllArgsConstructor()
        class AllArgsClass {
            @Getter()
            @Setter()
            name: string = '';
            @Getter()
            @Setter()
            age: number = 0;
        }
        
        test('should create instance with all arguments', () => {
            const instance = new (AllArgsClass as any)('John', 30);
            expect(instance.name).toBe('John');
            expect(instance.age).toBe(30);
        });
    });
    
    // Test RequiredArgsConstructor
    describe('@RequiredArgsConstructor', () => {
        @RequiredArgsConstructor()
        class RequiredArgsClass {
            @Getter()
            name: string = 'required';
            @Getter()
            optional?: string;
        }
        
        test('should create instance with required arguments', () => {
            const instance = new (RequiredArgsClass as any)('TestName');
            expect(instance.name).toBe('TestName');
        });
    });
    
    // Test ToString decorator
    describe('@ToString', () => {
        @ToString()
        class ToStringClass {
            name: string = 'test';
            value: number = 123;
        }
        
        test('should generate proper toString method', () => {
            const instance = new ToStringClass();
            const str = instance.toString();
            expect(str).toContain('test');
            expect(str).toContain('123');
            expect(str).toContain('ToStringClass');
        });
    });
    
    // Test Equals decorator
    describe('@Equals', () => {
        @Equals()
        class EqualsClass {
            name: string = 'test';
            value: number = 123;
        }
        
        test('should generate proper equals method', () => {
            const instance1 = new EqualsClass();
            const instance2 = new EqualsClass();
            const instance3 = new EqualsClass();
            instance3.value = 456;
            
            expect((instance1 as any).equals(instance2)).toBe(true);
            expect((instance1 as any).equals(instance3)).toBe(false);
            expect((instance1 as any).equals(null)).toBe(false);
            expect((instance1 as any).equals({})).toBe(false);
        });
    });
    
    // Test Getter decorator
    describe('@Getter', () => {
        class GetterClass {
            @Getter()
            name: string = 'test';
            @Getter()
            value: number = 123;
        }
        
        test('should generate getter methods', () => {
            const instance = new GetterClass();
            expect(typeof (instance as any).getName).toBe('function');
            expect(typeof (instance as any).getValue).toBe('function');
            expect((instance as any).getName()).toBe('test');
            expect((instance as any).getValue()).toBe(123);
        });
    });
    
    // Test Setter decorator
    describe('@Setter', () => {
        class SetterClass {
            @Setter()
            name: string = 'test';
            @Setter()
            value: number = 123;
        }
        
        test('should generate setter methods', () => {
            const instance = new SetterClass();
            expect(typeof (instance as any).setName).toBe('function');
            expect(typeof (instance as any).setValue).toBe('function');
            
            (instance as any).setName('updated');
            (instance as any).setValue(456);
            
            expect(instance.name).toBe('updated');
            expect(instance.value).toBe(456);
        });
    });
    
    // Test Builder decorator
    describe('@Builder', () => {
        @Builder()
        class BuilderClass {
            @Getter()
            name: string = '';
            @Getter()
            value: number = 0;
        }
        
        test('should generate builder pattern', () => {
            const instance = (BuilderClass as any).builder()
                .name('built')
                .value(789)
                .build();
                
            expect(instance.name).toBe('built');
            expect(instance.value).toBe(789);
        });
    });
    
    // Test Value decorator (immutable)
    describe('@Value', () => {
        @Value()
        class ValueClass {
            @Getter()
            name: string = 'immutable';
            @Getter()
            value: number = 999;
        }
        
        test('should create immutable object', () => {
            const instance = new ValueClass();
            expect(instance.name).toBe('immutable');
            expect(instance.value).toBe(999);
            
            // Test toString and equals from Value decorator
            expect(instance.toString()).toContain('immutable');
            expect(instance.toString()).toContain('999');
            
            const instance2 = new ValueClass();
            expect((instance as any).equals(instance2)).toBe(true);
        });
        
        test('should prevent property modification', () => {
            const instance = new ValueClass();
            
            // Try to modify properties (should not work due to read-only)
            const originalName = instance.name;
            const originalValue = instance.value;
            
            try {
                (instance as any).name = 'modified';
                (instance as any).value = 123;
            } catch (error) {
                // Expected to throw in strict mode
            }
            
            // Properties should remain unchanged (or throw in strict mode)
            // In non-strict mode, the assignment might be ignored
            expect(instance.name).toBe(originalName);
            expect(instance.value).toBe(originalValue);
        });
    });
    
    // Test Data decorator (combination)
    describe('@Data', () => {
        @Data()
        class DataClass {
            @Getter()
            @Setter()
            name: string = 'data';
            @Getter()
            @Setter()
            value: number = 555;
        }
        
        test('should provide all Data functionality', () => {
            const instance = new DataClass();
            
            // Test getters
            expect((instance as any).getName()).toBe('data');
            expect((instance as any).getValue()).toBe(555);
            
            // Test setters
            (instance as any).setName('updated');
            (instance as any).setValue(777);
            expect(instance.name).toBe('updated');
            expect(instance.value).toBe(777);
            
            // Test toString
            const str = instance.toString();
            expect(str).toContain('updated');
            expect(str).toContain('777');
            
            // Test equals
            const instance2 = new DataClass();
            (instance2 as any).setName('updated');
            (instance2 as any).setValue(777);
            expect((instance as any).equals(instance2)).toBe(true);
        });
    });
    
    // Test combined decorators
    describe('Combined Decorators', () => {
        @Data()
        @Builder()
        @AllArgsConstructor()
        class CombinedClass {
            @Getter()
            @Setter()
            name: string = '';
            @Getter()
            @Setter()
            value: number = 0;
        }
        
        test('should work with all decorators combined', () => {
            // Test builder
            const fromBuilder = (CombinedClass as any).builder()
                .name('builder')
                .value(100)
                .build();
            expect(fromBuilder.name).toBe('builder');
            expect(fromBuilder.value).toBe(100);
            
            // Test constructor
            const fromConstructor = new (CombinedClass as any)('constructor', 200);
            expect(fromConstructor.name).toBe('constructor');
            expect(fromConstructor.value).toBe(200);
            
            // Test getters/setters
            expect((fromConstructor as any).getName()).toBe('constructor');
            (fromConstructor as any).setValue(300);
            expect(fromConstructor.value).toBe(300);
            
            // Test toString and equals
            expect(fromConstructor.toString()).toContain('constructor');
            expect(fromConstructor.toString()).toContain('300');
        });
    });
});
