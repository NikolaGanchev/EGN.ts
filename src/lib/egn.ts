import { before1900, after1999 } from './ranges';
import Region from './region';
import regions from './regions';
import Gender from './genders';
import weights from './weights';
import Range from './range';

export default class EGN {
    egn: string;
    isValid: boolean = false;
    birthday: Date | null;
    region: Region | null;
    gender: Gender | null;
    controlNumber: number | null;
    calculatedControlNumber: number | null;
    egnArray: number[] | null;

    constructor(EGN: string) {
        this.egn = EGN;
        this.birthday = this.getDateFromEGN();
        this.region = this.getRegion();
        this.gender = this.getGender();
        this.controlNumber = this.getControlNumber();
        this.egnArray = this.getEGNAsNumArray();
        this.calculatedControlNumber = this.calculateControlNumber();
        this.validate();
    }

    private validate() {
        this.isValid = this.egn.length === 10
            && this.birthday != null
            && this.region != null
            && this.gender != null
            && this.controlNumber != null
            && this.egnArray != null
            && this.calculatedControlNumber == this.controlNumber;
    }

    private getDateFromEGN(): Date | null {
        let EGN: string = this.egn;
        let dateString: string = EGN.substring(0, 6);
        let year: number | undefined = parseInt(dateString.substring(0, 2));
        let month: number | undefined = parseInt(dateString.substring(2, 4));
        let day: number | undefined = parseInt(dateString.substring(4, 6));

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return null;
        }

        if (before1900.contains(month)) {
            year += 1800;
            month -= 20;
        }

        if (after1999.contains(month)) {
            year += 2000;
            month -= 40;
        }

        // You have to subtract one from the month, since the Date() constructor counts them from 0 (ex. -> January is 0, February is 1...)
        // You also have to add 1 to the day, since it apparently counts them in a very strange way too.
        let date: Date = new Date(year, month - 1, day + 1);
        return date;
    }

    private getRegion(): Region | null {
        let region: Region | null = null;
        let regionString: string = this.egn.substring(6, 9);

        // Remove first zero at first position if one exists
        if (regionString.charAt(0) === '0') {
            regionString = regionString.substring(1);
        }

        // There still exists the possibility of the code being 1 digit
        if (regionString.charAt(0) === '0') {
            regionString = regionString.substring(1);
        }

        let regionIntTemp: number | undefined = parseInt(regionString);

        if (isNaN(regionIntTemp)) {
            return null;
        }

        let regionInt: number = regionIntTemp;

        regions.some((currentRegion) => {
            if (currentRegion.range.contains(regionInt)) {
                region = currentRegion;
                return true;
            }
            return false;
        });

        return region;
    }

    private getGender(): Gender | null {
        // the ninth number is the number of the EGN which dictates one's gender
        let genderNum: number | undefined = parseInt(this.egn[8]);

        if (isNaN(genderNum)) {
            return null;
        }

        return (genderNum % 2 === 0) ? Gender.Man : Gender.Woman;
    }

    private getControlNumber(): number | null {
        let controlNumber: number | undefined = parseInt(this.egn.substring(9));

        if (isNaN(controlNumber)) {
            return null;
        }

        return controlNumber;
    }

    private getEGNAsNumArray(): number[] | null {
        let egnArray: number[] = [];
        let hasUndefinedNumber: boolean = false;

        this.egn.split("").forEach((char) => {
            let charAsNum: number | undefined = parseInt(char);

            if (isNaN(charAsNum)) {
                hasUndefinedNumber = true;
                return;
            }

            egnArray.push(charAsNum);
        });

        return (hasUndefinedNumber) ? null : egnArray;
    }

    private calculateControlNumber(): number | null {
        let egnArrayLocal: number[] = [];

        // Need to clone array, since straight up assigning messes up the original array
        this.egnArray?.forEach((num) => {
            egnArrayLocal.push(num);
        })

        if (egnArrayLocal === null) {
            return null;
        }

        let controlSum: number = 0;

        // Remove input control number from array, since it doesn't go into the calculations
        egnArrayLocal.pop();

        for (let i = 0; i < egnArrayLocal.length; i++) {

            let weight: number | undefined = weights.get((i + 1));

            if (Number.isNaN(weight)) {
                return null;
            }

            controlSum += egnArrayLocal[i] * weight!;
        }

        let controlNumber = controlSum % 11;

        // Checking controlNumber since it cannot be 10 or more
        if (controlNumber >= 10) {
            controlNumber = 0;
        }

        return controlNumber;
    }

    static generateRandom(date: Date = this.generateRandomDate(), region: Region = this.generateRandomRegion(), gender: Gender = this.generateRandomGender()): EGN {
        let egn: string = "";

        egn += this.constructDateString(date);
        egn += this.generateRegionAndGenderCode(region, gender);
        egn += this.calculateControlNumber(egn);

        let egnObject: EGN = new EGN(egn);

        return egnObject;
    }

    private static constructDateString(date: Date): string {

        let dateNum: number = date.getDate();
        let monthNum: number = date.getMonth() + 1;
        let yearNum: number = date.getFullYear();

        let dateString = "";

        dateString += yearNum.toString().substring(2, 4);

        if (yearNum < 1900) {
            monthNum += 20;
        }

        if (yearNum > 1999) {
            monthNum += 40;
        }

        if (monthNum < 10) {
            dateString += "0" + monthNum;
        }
        else {
            dateString += monthNum;
        }

        if (dateNum < 10) {
            dateString += "0" + dateNum;
        }
        else {
            dateString += dateNum;
        }

        return dateString;
    }

    private static generateRegionAndGenderCode(region: Region, gender: Gender): string {
        let randomNumber: number = 0;
        if (gender == Gender.Man) {
            randomNumber = this.generateRandomEvenInRange(region.range);
        }
        else {
            randomNumber = this.generateRandomOddInRange(region.range);
        }

        if (randomNumber < 10) {
            return "00" + randomNumber.toString();
        }

        if (randomNumber < 100) {
            return "0" + randomNumber.toString();
        }

        return randomNumber.toString();
    }

    private static generateRandomEvenInRange(range: Range): number {
        let randomNum: number = Math.floor(Math.random() * (range.lastNumber - range.firstNumber) + range.firstNumber);
        if (randomNum % 2 != 0) {
            if (range.contains(randomNum - 1)) {
                return randomNum - 1;
            }
            else {
                return randomNum + 1;
            }
        }
        return randomNum;
    }

    private static generateRandomOddInRange(range: Range) {
        let randomNum: number = Math.floor(Math.random() * (range.lastNumber - range.firstNumber) + range.firstNumber);
        if (randomNum % 2 == 0) {
            if (range.contains(randomNum - 1)) {
                return randomNum - 1;
            }
            else {
                return randomNum + 1;
            }
        }
        return randomNum;
    }

    static generateRandomInDateInterval(startDate: Date = new Date(1800, 0, 1), endDate: Date = new Date(), region: Region = this.generateRandomRegion(), gender: Gender = this.generateRandomGender()) {
        return this.generateRandom(this.generateRandomDate(startDate, endDate), region, gender);
    }

    private static generateRandomDate(startDate: Date = new Date(1800, 0, 1), endDate: Date = new Date()): Date {
        return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    }

    private static generateRandomRegion(): Region {
        let randomNumber: number = Math.floor(Math.random() * (regions.length - 1));
        return regions[randomNumber == -1 ? 0 : randomNumber];
    }

    private static generateRandomGender(): Gender {
        let randomNumber = Math.floor(Math.random() * 2) + 1;
        randomNumber--;
        let gender: Gender = randomNumber;
        return gender;
    }

    private static getEGNAsNumArray(egn: string): number[] {
        let egnArray: number[] = [];
        let hasUndefinedNumber: boolean = false;

        egn.split("").forEach((char) => {
            let charAsNum: number | undefined = parseInt(char);

            if (isNaN(charAsNum)) {
                hasUndefinedNumber = true;
                return;
            }

            egnArray.push(charAsNum);
        });

        if (hasUndefinedNumber) {
            throw "The EGN has an undefined character in it. Do not forget it can only contain numbers.";
        }

        return egnArray;
    }

    private static calculateControlNumber(egn: string): String {
        let egnArrayLocal: number[] = this.getEGNAsNumArray(egn);

        let controlSum: number = 0;

        for (let i = 0; i < egnArrayLocal.length; i++) {

            let weight: number | undefined = weights.get((i + 1));

            if (Number.isNaN(weight)) {
                throw "NaN number while generating random EGN."
            }

            controlSum += egnArrayLocal[i] * weight!;
        }

        let controlNumber = controlSum % 11;

        // Checking controlNumber since it cannot be 10 or more
        if (controlNumber >= 10) {
            controlNumber = 0;
        }

        return controlNumber.toString();
    }
}