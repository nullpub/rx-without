# rxjs without
It's easy enough to filter on an existing observable, but sometimes you just want an observable with everything you haven't filtered on. If this sounds familiat, then this is the operator for you!

## Motivation
Say you have a situation like this..

```ts
import { timer } from 'rxjs/Observable/timer';
import 'rxjs/add/operator/filter';

const source = timer(0, 1000);
const threes = source.filter(t => !(t%3));
const fives = source.filter(t => !(t%5));
const everythingElse = source.filter(t => (t%3 || t%5));
```

Right now this is fine, but if you want to start pulling out other numbers from everythingElse, things get tricky! Enter ```without```.

## Installation and Usage
If you're using ES module imports or Typescript you can pull in fromEvents directly.

```ts
import { without } from '@nll/rx-without';
```

If you're using CommonJS modules you can access the functions using require.

```js
const { without } = require('@nll/rx-without');
```

If you don't like destructuring or are targetting ES5 you can of course do things the long way.

```js
var without = require('@nll/rx-without').without;
```

## API
This module was written in native typescript with type definitions automatically created. For those without types here are the function signatures.

#### without\<T>(*source*: Observable\<T>, *discriminant*: Observable\<T> | Observable\<T>[]): Observable\<T>
This one is pretty simple. For the sake of brevity I'll pull the simple example directly from the examples directory.

```ts
import { timer } from 'rxjs/Observable/timer';
import 'rxjs/add/operator/filter';

import { without } from '../src/';

const source = timer(0, 1000);
const threes = source.filter(t => !(t%3));
const fives = source.filter(t => !(t%5));

const notThreesOrFives = without<number>(source, [threes, fives]);

notThreesOrFives.subscribe(e => console.log(e));
// 1
// 2
// 4
// 7
// 8
// ...and so on
```
It's simple, ```without(source, filters)``` will give you a copy of the source observable without any of the events emitted by the filters (or any of the filters in the array).

If you're into math at all, this operator is a *relative complement over time*. Meaning that the events from source and the filters have to happen at the same time.