import { before1900, after1999 } from './ranges';
import Region from './region';
import regions from './regions';

export default class EGN {
    egn: string;
    isValid: boolean = false;
    birthday: Date | null;
    region: Region | null;
    controlNumber: number | null;

    constructor(EGN: string) {
        this.egn = EGN;
        this.birthday = this.getDateFromEGN();
        this.region = this.getRegion();
        this.controlNumber = this.getControlNumber();
        this.validate();
    }

    private validate() {
        this.isValid = this.birthday != null && this.region != null && this.controlNumber != null;
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
        //You also have to add 1 to the day, since it apparently counts them in a very strange way too.
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

    private getControlNumber(): number | null {
        let controlNumber: number | undefined = parseInt(this.egn.substring(9));

        if (isNaN(controlNumber)) {
            return null;
        }

        return controlNumber;
    }

    private getEGNAsNumArray(): number[] | null {
        let egnArray: number[] = [];
        var hasUndefinedNumber: boolean = false;

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
        let egnArray: number[] | null = this.getEGNAsNumArray();

        if (egnArray === null) {
            return null;
        }

        return 9;
    }
}