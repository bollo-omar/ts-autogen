# TypeScript Autogen

🚀 **Lightweight Lombok-style decorators for TypeScript** that automatically generate boilerplate code with zero configuration.

[![npm version](https://badge.fury.io/js/@bollo-aggrey%2Fts-autogen.svg)](https://www.npmjs.com/package/@bollo-aggrey/ts-autogen)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5%2B-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🏗️ **`@Data`** - Generates getters, setters, toString, and equals methods
- 🔧 **`@Builder`** - Creates fluent builder pattern
- 📝 **`@Getter` / `@Setter`** - Individual property accessors
- 🔍 **`@ToString` / `@Equals`** - Object utility methods
- 🏭 **`@AllArgsConstructor` / `@NoArgsConstructor`** - Constructor generation
- 🔒 **`@Value`** - Immutable object creation
- 🎯 **Clean TypeScript Support** - One-line utility for perfect typing

## 📦 Installation

```bash
npm install @bollo-aggrey/ts-autogen
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { 
    Data, 
    Builder, 
    AllArgsConstructor, 
    Getter, 
    Setter,
    autogen 
} from '@bollo-aggrey/ts-autogen';

// Define your class with decorators
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
    
    // Custom methods work alongside generated ones
    public save(): string {
        return `Saved product: ${this.name}`;
    }
}

// Enable TypeScript support with one line!
export const Product = autogen(ProductClass);
```

### Usage Examples

```typescript
// 1. Builder Pattern
const laptop = Product.builder()
    .name('MacBook Pro')
    .price(2499.99)
    .category('Electronics')
    .build();

// 2. All-Args Constructor
const phone = new Product('iPhone 15', 999.99, 'Electronics');

// 3. Generated Getters
console.log(laptop.getName());     // "MacBook Pro"
console.log(laptop.getPrice());    // 2499.99
console.log(laptop.getCategory()); // "Electronics"

// 4. Generated Setters
phone.setName('iPhone 15 Pro');
phone.setPrice(1099.99);

// 5. ToString Method
console.log(laptop.toString());
// Output: "ProductClass{name=MacBook Pro, price=2499.99, category=Electronics}"

// 6. Equals Method
const duplicate = new Product('iPhone 15 Pro', 1099.99, 'Electronics');
console.log(phone.equals(duplicate)); // true

// 7. Custom Methods
console.log(laptop.save()); // "Saved product: MacBook Pro"
```

## 📚 Decorator Reference

### `@Data()`
Combines `@Getter`, `@Setter`, `@ToString`, and `@Equals` for all properties.

```typescript
@Data()
class User {
    @Getter() @Setter() name: string = '';
    @Getter() @Setter() email: string = '';
}

const user = autogen(User);
// Generates: getName(), setName(), getEmail(), setEmail(), toString(), equals()
```

### `@Builder()`
Creates a fluent builder pattern for object construction.

```typescript
@Builder()
class Config {
    @Getter() host: string = '';
    @Getter() port: number = 0;
}

const ConfigTyped = autogen(Config);
const config = ConfigTyped.builder()
    .host('localhost')
    .port(3000)
    .build();
```

### `@AllArgsConstructor()`
Generates a constructor that accepts all properties as arguments.

```typescript
@AllArgsConstructor()
class Point {
    @Getter() x: number = 0;
    @Getter() y: number = 0;
}

const PointTyped = autogen(Point);
const point = new PointTyped(10, 20);
```

### `@Getter()` / `@Setter()`
Generate individual getter and setter methods for properties.

```typescript
class Person {
    @Getter() @Setter() name: string = '';
    @Getter() age: number = 0; // Read-only
}

const PersonTyped = autogen(Person);
// Generates: getName(), setName(), getAge()
```

### `@ToString()`
Generates a string representation of the object.

```typescript
@ToString()
class Book {
    title: string = '';
    author: string = '';
}

const book = new Book();
console.log(book.toString()); // "Book{title=, author=}"
```

### `@Equals()`
Generates an equality comparison method.

```typescript
@Equals()
class Coordinate {
    x: number = 0;
    y: number = 0;
}

const coord1 = new Coordinate();
const coord2 = new Coordinate();
console.log(coord1.equals(coord2)); // true
```

### `@Value()`
Creates an immutable object with toString and equals methods.

```typescript
@Value()
class ImmutableConfig {
    @Getter() apiUrl: string = 'https://api.example.com';
    @Getter() timeout: number = 5000;
}

const config = new ImmutableConfig();
// Properties are read-only after creation
```

### `@NoArgsConstructor()`
Generates a no-argument constructor.

```typescript
@NoArgsConstructor()
class Service {
    @Getter() @Setter() name: string = 'DefaultService';
}

const ServiceTyped = autogen(Service);
const service = new ServiceTyped(); // No arguments required
```

## ⚙️ TypeScript Configuration

Add these settings to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES2020",
    "module": "CommonJS"
  }
}
```

## 🎯 Why Use TypeScript Autogen?

### ✅ **Reduces Boilerplate**
```typescript
// Without autogen (50+ lines)
class Product {
    private _name: string = '';
    private _price: number = 0;
    
    getName(): string { return this._name; }
    setName(name: string): void { this._name = name; }
    getPrice(): number { return this._price; }
    setPrice(price: number): void { this._price = price; }
    
    toString(): string {
        return `Product{name=${this._name}, price=${this._price}}`;
    }
    
    equals(other: Product): boolean {
        return this._name === other._name && this._price === other._price;
    }
    
    static builder() {
        return {
            name: (n: string) => ({ ...this, _name: n }),
            price: (p: number) => ({ ...this, _price: p }),
            build: () => new Product()
        };
    }
}

// With autogen (8 lines!)
@Data()
@Builder()
class ProductClass {
    @Getter() @Setter() name: string = '';
    @Getter() @Setter() price: number = 0;
}
const Product = autogen(ProductClass);
```

### ✅ **Type-Safe**
Full TypeScript support with IntelliSense for all generated methods.

### ✅ **Runtime Performance**
Zero runtime overhead - decorators generate methods at class definition time.

### ✅ **Familiar API**
If you know Java Lombok, you already know TypeScript Autogen.

## 🔧 Advanced Usage

### Combining Decorators

```typescript
@Data()
@Builder()
@AllArgsConstructor()
@Value() // Makes object immutable
class ImmutableProduct {
    @Getter() name: string = '';
    @Getter() price: number = 0;
}

const Product = autogen(ImmutableProduct);

// All features work together
const product = Product.builder()
    .name('Laptop')
    .price(999)
    .build();

console.log(product.getName()); // "Laptop"
console.log(product.toString()); // Clean output
// product.setName('New'); // Won't work - immutable!
```

## 📋 Requirements

- **Node.js**: 14.0.0+
- **TypeScript**: 4.5.0+
- **Decorators**: `experimentalDecorators: true`
- **Metadata**: `emitDecoratorMetadata: true`

## 🧪 Testing

All decorators are thoroughly tested with 21+ test cases covering:

- Individual decorator functionality
- Decorator combinations
- Edge cases and error handling
- TypeScript compilation
- Runtime behavior

Run tests:
```bash
npm test
```

## 🔔 Version Updates

TypeScript Autogen automatically checks for new versions and notifies you when updates are available.

### Automatic Notifications

The library automatically checks for updates when imported (non-blocking):

```typescript
import { Data, autogen } from '@bollo-aggrey/ts-autogen';
// Will show update notification if new version available
```

### Manual Version Check

Check for updates manually using the CLI:

```bash
# Check current version
npx ts-autogen-check --version

# Check for available updates
npx ts-autogen-check --check-updates

# Or use npm script
npm run check-updates
```

### Programmatic Version Check

Check for updates in your code:

```typescript
import { checkForUpdates, getVersionInfo } from '@bollo-aggrey/ts-autogen';

// Get current version info
const info = getVersionInfo();
console.log(`Using ${info.packageName} v${info.version}`);

// Check for updates
const updateInfo = await checkForUpdates();
if (updateInfo.hasUpdate) {
    console.log(`Update available: ${updateInfo.latestVersion}`);
}
```

### Environment Variables

Control update checking behavior:

```bash
# Enable update checks in production
TS_AUTOGEN_CHECK_UPDATES=true

# Disable automatic checks
NODE_ENV=production
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by [Project Lombok](https://projectlombok.org/) for Java.

---

**Made with ❤️ for the TypeScript community**
