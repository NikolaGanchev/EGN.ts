import test from 'ava'
import Interval from "./interval";

test("Interval", (t) => {
    t.is(new Interval(0, 43).contains(42), true);
})