# TypeScript Autogen

🚀 Lombok-style decorators for TypeScript — Generate clean, type-safe boilerplate code with **zero configuration**. Works with both ESM and CommonJS modules.

[![npm version](https://img.shields.io/npm/v/@bollo-aggrey/ts-autogen?style=flat-square&color=blue)](https://www.npmjs.com/package/@bollo-aggrey/ts-autogen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/@bollo-aggrey/ts-autogen?style=flat-square&color=green)](https://www.npmjs.com/package/@bollo-aggrey/ts-autogen)

## ✨ Features

- 🏗️ `@Data` – Generates getters, setters, `toString`, `equals`, and `hashCode`
- 🔧 `@Builder` – Fluent builder pattern with type-safe method chaining
- 📝 `@Getter` / `@Setter` – Fine-grained property access control
- 🔍 `@ToString` / `@Equals` / `@HashCode` – Complete object utilities
- 🏭 `@AllArgsConstructor` / `@NoArgsConstructor` / `@RequiredArgsConstructor` – Flexible constructor generation
- 🔒 `@Value` – Immutable objects with `readonly` properties
- 🚀 `@With` – Immutable 'wither' methods for functional updates
- 🎯 Full TypeScript Support with IntelliSense and type inference
- ⚡ Zero runtime overhead – Compile-time transformations only
- 🔄 Automatic version checking to keep your decorators up-to-date

## 📦 Installation

```bash
# Using npm
npm install @bollo-aggrey/ts-autogen

# Using yarn
yarn add @bollo-aggrey/ts-autogen

# Using pnpm
pnpm add @bollo-aggrey/ts-autogen
```

> 💡 The package includes automatic version checking to ensure you're always using the latest features and bug fixes. You'll be notified in your console if an update is available.

## 🚀 Quick Start

### Basic Usage

```typescript
import { Data, Builder, AllArgsConstructor, Getter, Setter, autogen } from '@bollo-aggrey/ts-autogen';

// Define your class with decorators
@Data()
@Builder()
@AllArgsConstructor()
class ProductClass {
  @Getter() @Setter() name: string = '';
  @Getter() @Setter() price: number = 0;
  @Getter() @Setter() category: string = '';

  // Custom methods are preserved
  public save(): string {
    return `Saved product: ${this.name}`;
  }
}

// Create the enhanced class
export const Product = autogen(ProductClass);

// Usage
const laptop = Product.builder()
  .name('MacBook Pro')
  .price(2499.99)
  .category('Electronics')
  .build();

console.log(laptop.getName()); // "MacBook Pro"
console.log(laptop.toString()); // "ProductClass(name=MacBook Pro, price=2499.99, category=Electronics)"

// Immutable updates with @With
const updatedLaptop = laptop.withName('MacBook Pro M2');
```

### Advanced Usage

```typescript
import { Value, Builder, With, autogen } from '@bollo-aggrey/ts-autogen';

// Create an immutable value object
@Value()
@Builder()
class ImmutablePoint {
  @With() readonly x: number;
  @With() readonly y: number;
  
  // Custom methods are preserved
  distanceToOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const Point = autogen(ImmutablePoint);

const point = Point.builder().x(3).y(4).build();
console.log(point.distanceToOrigin()); // 5

// Create a new instance with updated values
const movedPoint = point.withX(5).withY(12);
console.log(movedPoint.distanceToOrigin()); // 13
```
```

## 📚 Complete Decorator Reference

### `@Getter` and `@Setter`
Generate getter and setter methods for class properties.

```typescript
class User {
  @Getter() private _name: string = '';
  @Setter() private _email: string = '';
}

const user = new User();
user.setEmail('test@example.com');
console.log(user.getEmail()); // "test@example.com"
```

### `@ToString`
Generates a `toString()` method.

```typescript
@ToString()
class Point {
  x: number = 0;
  y: number = 0;
}

const point = new Point();
console.log(point.toString()); // "Point(x=0, y=0)"
```

### `@Equals` and `@HashCode`
Generate `equals()` and `hashCode()` methods.

```typescript
@Equals()
@HashCode()
class User {
  id: number = 0;
  name: string = '';
}

const user1 = new User();
user1.id = 1;
user1.name = 'Alice';

const user2 = new User();
user2.id = 1;
user2.name = 'Alice';

console.log(user1.equals(user2)); // true
```

### `@With`
Generates 'wither' methods for immutable updates.

```typescript
@Value()
class Config {
  @With() readonly host: string = 'localhost';
  @With() readonly port: number = 3000;
}

const config = new Config();
const updated = config
  .withHost('example.com')
  .withPort(8080);
```

### `@RequiredArgsConstructor`
Generates a constructor with required properties.

```typescript
@RequiredArgsConstructor()
class User {
  @Getter() private readonly id: number;
  @Getter() private readonly name: string;
  private readonly optional?: string;
}

// Only required parameters in constructor
const user = new User(1, 'Alice');
```

### `@Data()`
Combines `@Getter`, `@Setter`, `@ToString`, and `@Equals`.

```typescript
@Data()
class User {
  @Getter() @Setter() name: string = '';
  @Getter() @Setter() email: string = '';
}

const UserModel = autogen(User);
// → getName(), setName(), getEmail(), setEmail(), toString(), equals()
```

### `@Builder()`
Generates a fluent builder.

```typescript
@Builder()
class Config {
  @Getter() host: string = '';
  @Getter() port: number = 0;
}

const ConfigModel = autogen(Config);
const config = ConfigModel.builder().host('localhost').port(3000).build();
```

### `@AllArgsConstructor()` / `@NoArgsConstructor()`

```typescript
@AllArgsConstructor()
@NoArgsConstructor()
class Point {
  @Getter() x: number = 0;
  @Getter() y: number = 0;
}

const PointModel = autogen(Point);
const point1 = new PointModel(10, 20);
const point2 = new PointModel(); // no-arg
```

## ⚙️ Configuration

### TypeScript Configuration

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

### Version Checking

The package includes an automatic version checker that runs on `postinstall`. To disable it, set the environment variable:

```bash
export TS_AUTOGEN_SKIP_VERSION_CHECK=true
```

Or check for updates manually:

```bash
npx ts-autogen-check --check-updates
```

## 🎯 Why Use TypeScript Autogen?

- ✅ **Reduced Boilerplate** - Generate common methods automatically
- ✅ **Type Safety** - Full TypeScript support with IntelliSense
- ✅ **Familiar API** - Similar to Java Lombok for easy adoption
- ✅ **Zero Runtime Overhead** - All transformations happen at compile-time
- ✅ **Immutability Support** - First-class support for immutable data structures
- ✅ **Framework Agnostic** - Works with any TypeScript project
- ✅ **Automatic Updates** - Built-in version checking to keep you up-to-date

## 📋 Requirements

- Node.js 20.0+
- TypeScript 4.5+
- `"experimentalDecorators": true` in `tsconfig.json`
- `"emitDecoratorMetadata": true` in `tsconfig.json` (required for some features)

## 🧪 Testing

```bash
npm test
```

## 🤝 Contributing

Contributions welcome! Open issues and PRs are appreciated.

## 📄 License

MIT License – see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- Inspired by Project Lombok for Java
- Made with ❤️ for the TypeScript community
