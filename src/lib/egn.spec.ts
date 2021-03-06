import test from 'ava'
import EGN from './egn'
import Gender from './genders';
import { regionsObject } from './regions';
import Region from "./region";

test("isValid", (t) => {
    t.is(new EGN("6101057509").isValid, true);
});

test("isNotValid", (t) => {
    t.is(new EGN("6101057508").isValid, false);
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

test("Region with 000", (t) => {
    t.is(new EGN("0208020000").isValid, true);
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

test("Random EGN", (t) => {
    let egn: EGN = EGN.generateRandom();
    t.log(egn);
    t.is(egn.isValid, true);
});

test("Random EGN in Date range", (t) => {
    let startDate: Date = new Date(2005, 9, 25);
    let endDate: Date = new Date(2005, 9, 29);
    let egn: EGN = EGN.generateRandomInDateInterval(startDate, endDate);
    t.is((egn.isValid) ? egn.birthday! >= startDate && egn.birthday! <= endDate : false, true)
})

test("Random EGN with region", (t) => {
    let region: Region = regionsObject.Stara_Zagora;
    let egn: EGN = EGN.generateRandom(undefined, region, undefined);
    t.log(egn);
    t.deepEqual(egn.region, regionsObject.Stara_Zagora);
})

test("Random EGN with gender", (t) => {
    let egn: EGN = EGN.generateRandom(undefined, undefined, Gender.Man);
    t.is(egn.gender, Gender.Man);
})