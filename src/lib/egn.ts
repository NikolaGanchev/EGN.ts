export default class EGN {
    egn: string;
    isValid: boolean = false;
    birthday: Date | null;

    constructor(EGN: string) {
        this.egn = EGN;
        this.birthday = this.getDateFromEGN();
        this.validate();
    }

    private validate() {
        this.isValid = this.birthday != null;
    }

    getDateFromEGN(): Date | null {
        let EGN: string = this.egn;
        let dateString: string = EGN.substring(0, 6);
        let year: number = parseInt(dateString.substring(0, 2));
        let month: number = parseInt(dateString.substring(2, 4));
        let day: number = parseInt(dateString.substring(4, 6));

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return null;
        }

        // You have to subtract one from the month, since the Date() constructor counts them from 0 (ex. -> January is 0, February is 1...)
        //You also have to add 1 to the day, since it apparently counts them in a very strange way too.
        let date: Date = new Date(year, month - 1, day + 1);
        return date;
    }
}