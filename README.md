# TypeScript Autogen

🚀 Lombok-style decorators for TypeScript — reduce boilerplate for getters, setters, builders, and related helpers. Works with both ESM and CommonJS modules.

[![npm version](https://img.shields.io/npm/v/@bollo-aggrey/ts-autogen?style=flat-square&color=blue)](https://www.npmjs.com/package/@bollo-aggrey/ts-autogen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/@bollo-aggrey/ts-autogen?style=flat-square&color=green)](https://www.npmjs.com/package/@bollo-aggrey/ts-autogen)

## ✨ Features

- 🏗️ `@Data` – Generates getters, setters, `toString`, and `equals`
- 🔧 `@Builder` – Fluent builder pattern with type-safe method chaining
- 📝 `@Getter` / `@Setter` – Fine-grained property access control
- 🔍 `@ToString` / `@Equals` – Object string and equality helpers
- 🏭 `@AllArgsConstructor` / `@NoArgsConstructor` / `@RequiredArgsConstructor` – Flexible constructor generation
- 🔒 `@Value` – Immutable objects with `readonly` properties
- 🎯 TypeScript: opt-in typings for generated APIs via `autogen` / `autogenDataBuilder` (see below)
- 🔄 Automatic version checking to keep your decorators up-to-date

## What was fixed

- **`autogen()` typing** – Previously `autogen` was typed to return `any`, so editors could not complete `builder()`, getters, setters, etc. You now pass a small **feature map** (with `as const`) that matches your decorators, or use **`autogenDataBuilder()`** for the common `@Data()` + `@Builder()` stack. Exported types include `AutogenFeatures`, `AutogenClass`, `AugmentedInstance`, and `FluentBuilderFor`.
- **README accuracy** – Decorators apply behavior at **runtime** (prototype / class wrapping), not via a separate compile-time code generator. Earlier wording implied zero runtime cost and compile-only transforms; that was incorrect.
- **`npm test` on Windows** – The test script no longer relies on Unix-style `NODE_OPTIONS='...'`; it uses `node --import tsx` so tests run on Windows and Unix.
- **Stray markdown** – Removed a duplicate closing fence in the Advanced Usage example.

## 📦 Installation

```bash
npm install @bollo-aggrey/ts-autogen
yarn add @bollo-aggrey/ts-autogen
pnpm add @bollo-aggrey/ts-autogen
```

> 💡 The package includes automatic version checking to ensure you're always using the latest features and bug fixes. You'll be notified in your console if an update is available.

## 🚀 Quick Start

### Basic Usage

```typescript
import {
  Data,
  Builder,
  AllArgsConstructor,
  Getter,
  Setter,
  autogenDataBuilder
} from '@bollo-aggrey/ts-autogen';

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

export const Product = autogenDataBuilder(ProductClass);

const laptop = Product.builder()
  .name('MacBook Pro')
  .price(2499.99)
  .category('Electronics')
  .build();

console.log(laptop.getName());
console.log(laptop.toString());
```

### Typing generated APIs (`autogen`)

TypeScript does not infer methods added by decorators. Use either:

- **`autogenDataBuilder(MyClass)`** when you use `@Data()` and `@Builder()` together (same typings as `autogen(MyClass, { builder: true, data: true } as const)`).
- **`autogen(MyClass, features as const)`** with flags that match your stack, for example `{ builder: true }`, `{ data: true }`, `{ instanceToString: true }`, `{ instanceEquals: true }` (the last two avoid clashing with `Object.prototype.toString` in the type map).

`autogen(MyClass)` with one argument still returns `MyClass` unchanged for typing: add the second argument when you want completions for generated members.

### Advanced usage

```typescript
import { Value, Builder, Getter, autogen } from '@bollo-aggrey/ts-autogen';

@Value()
@Builder()
class ImmutablePoint {
  @Getter() x: number = 0;
  @Getter() y: number = 0;

  distanceToOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const Point = autogen(ImmutablePoint, {
  builder: true,
  instanceToString: true,
  instanceEquals: true
} as const);

const point = Point.builder().x(3).y(4).build();
console.log(point.distanceToOrigin());
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
console.log(user.getEmail());
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
console.log(point.toString());
```

### `@Equals`
Generates an `equals()` method (value objects often pair this with `@ToString()` or use `@Value()` which applies both).

```typescript
@Equals()
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

console.log(user1.equals(user2));
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

const user = new User(1, 'Alice');
```

### `@Data()`
Combines `@Getter`, `@Setter`, `@ToString`, and `@Equals`.

```typescript
import { Data, Getter, Setter, autogen } from '@bollo-aggrey/ts-autogen';

@Data()
class User {
  @Getter() @Setter() name: string = '';
  @Getter() @Setter() email: string = '';
}

const UserModel = autogen(User, { data: true } as const);
```

### `@Builder()`
Generates a fluent builder.

```typescript
import { Builder, Getter, autogen } from '@bollo-aggrey/ts-autogen';

@Builder()
class Config {
  @Getter() host: string = '';
  @Getter() port: number = 0;
}

const ConfigModel = autogen(Config, { builder: true } as const);
const config = ConfigModel.builder().host('localhost').port(3000).build();
```

### `@AllArgsConstructor()` / `@NoArgsConstructor()`

```typescript
import { AllArgsConstructor, NoArgsConstructor, Getter, Builder, autogen } from '@bollo-aggrey/ts-autogen';

@AllArgsConstructor()
@NoArgsConstructor()
class Point {
  @Getter() x: number = 0;
  @Getter() y: number = 0;
}

const PointModel = autogen(Point, { builder: true } as const);
const point1 = new PointModel(10, 20);
const point2 = new PointModel();
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
- ✅ **Type safety** - Strong typings when you use `autogen` / `autogenDataBuilder` with a matching feature map
- ✅ **Familiar API** - Similar to Java Lombok for easy adoption
- ✅ **Runtime decorators** - Generated members are attached when the class is defined (no separate build plugin required)
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
