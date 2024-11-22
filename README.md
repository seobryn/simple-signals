# Simple Signals

This repository contains a simple implementation of signals for javascript.

## Installation

```bash
npm install @seobryn/simple-signals
```

## Usage

```js
import { Signal } from '@seobryn/simple-signals';

const signal = new Signal();

signal.connect("test", (item: string) => console.log(item)); // Should print into console the text: `My Test argument` when the signal is emitted

signal.emit("test", "My Test argument");
```

## License

This project is released under the [AGPL-3.0-only](https://github.com/Seobryn/simple-signals/blob/main/LICENSE) license.
