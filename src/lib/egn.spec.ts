import test from 'ava'
import EGN from './egn'
import Gender from './genders';

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

test("Gender Man", (t) => {
    t.is(new EGN("6101057509").gender, Gender.Man);
});

test("Gender Woman", (t) => {
    t.is(new EGN("7104186311").gender, Gender.Woman);
});

test("Control number", (t) => {
    t.is(new EGN("6101057509").controlNumber, 9);
});

test("Calculated control number", (t) => {
    t.is(new EGN("6101057509").calculatedControlNumber, 9);
});

test("EGN as array", (t) => {
    t.deepEqual(new EGN("6101057509").egnArray, [6, 1, 0, 1, 0, 5, 7, 5, 0, 9]);
});