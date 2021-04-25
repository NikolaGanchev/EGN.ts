import test from 'ava'
import Range from "./range";

test("Range", (t) => {
    t.is(new Range(0, 43).contains(42), true);
})