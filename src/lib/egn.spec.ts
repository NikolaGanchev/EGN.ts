import test from 'ava'
import EGN from './egn'

test("isValid", (t) => {
    t.is(new EGN("6101057509").isValid, true);
});

test("Date", (t) => {
    t.deepEqual(new EGN("6101057509").birthday, new Date(61, 0, 6));
});

test("Date before 1900", (t) => {
    t.deepEqual(new EGN("0024252788").birthday, new Date(1800, 3, 26));
});

test("Date after 1999", (t) => {
    t.deepEqual(new EGN("0545263389").birthday, new Date(2005, 4, 27));
});

test("Region", (t) => {
    t.is(new EGN("6101057509").region?.name, "София – окръг");
});