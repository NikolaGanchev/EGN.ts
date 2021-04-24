import test from 'ava'
import EGN from './egn'

test("isValid", (t) => {
    t.is(new EGN("610105").isValid, true);
})

test("Date", (t) => {
    t.deepEqual(new EGN("610105").getDateFromEGN(), new Date(61, 0, 6));
})