import test from 'ava'
import { before1900, after1999 } from './ranges';

test("Before 1900 range", (t) => {
    t.is(before1900.contains(1 + 20), true);
    t.is(before1900.contains(12 + 20), true);
});

test("After 1999 range", (t) => {
    t.is(after1999.contains(1 + 40), true);
    t.is(after1999.contains(12 + 40), true);
});