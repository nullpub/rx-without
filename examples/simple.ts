/// <reference path="../node_modules/@types/node/index.d.ts" />
'use strict';

import { timer } from 'rxjs/Observable/timer';
import 'rxjs/add/operator/filter';

import { without } from '../src/';

const source = timer(0, 1000);
const threes = source.filter(t => !(t%3));
const fives = source.filter(t => !(t%5));

const notThreesOrFives = without<number>(source, [threes, fives]);

notThreesOrFives.subscribe(e => console.log(e));
