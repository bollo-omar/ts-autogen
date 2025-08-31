# TypeScript Autogen

🚀 Lombok-style decorators for TypeScript — generate boilerplate code with **zero configuration**.

[![npm version](https://img.shields.io/npm/v/@bollo_omar/ts-autogen.svg?style=flat-square)](https://www.npmjs.com/package/@bollo-omar/ts-autogen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@bollo-omar/ts-autogen.svg)](https://www.npmjs.com/package/@bollo-omar/ts-autogen)

## ✨ Features

- 🏗️ `@Data` – Generates getters, setters, `toString`, and `equals`
- 🔧 `@Builder` – Fluent builder pattern
- 📝 `@Getter` / `@Setter` – Individual property accessors
- 🔍 `@ToString` / `@Equals` – Object utilities
- 🏭 `@AllArgsConstructor` / `@NoArgsConstructor` – Constructor generation
- 🔒 `@Value` – Immutable objects
- 🎯 Full TypeScript Support with IntelliSense

## 📦 Installation

```bash
npm install @bollo_omar/ts-autogen@0.1.5
```

## 🚀 Quick Start

```typescript
import { Data, Builder, AllArgsConstructor, Getter, Setter, autogen } from '@bollo_omar/ts-autogen';

@Data()
@Builder()
@AllArgsConstructor()
class ProductClass {
  @Getter() @Setter() name: string = '';
  @Getter() @Setter() price: number = 0;
  @Getter() @Setter() category: string = '';

  public save(): string {
    return `Saved product: ${this.name}`;
  }
}

export const Product = autogen(ProductClass);

// Usage
const laptop = Product.builder()
  .name('MacBook Pro')
  .price(2499.99)
  .category('Electronics')
  .build();

console.log(laptop.getName()); // "MacBook Pro"
console.log(laptop.toString());
```

## 📚 Decorator Reference

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

## ⚙️ TypeScript Configuration

Add to your `tsconfig.json`:

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

- ✅ Reduce Boilerplate
- ✅ Type-Safe with IntelliSense
- ✅ Familiar API if you know Java Lombok
- ✅ Zero Runtime Overhead

## 📋 Requirements

- Node.js 14.0+
- TypeScript 4.5+
- `"experimentalDecorators": true` in `tsconfig.json`

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
