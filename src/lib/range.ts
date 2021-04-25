export default class Range {
    firstNumber: number;
    lastNumber: number;

    constructor(firstNumber: number, lastNumber: number) {
        this.firstNumber = firstNumber;
        this.lastNumber = lastNumber;
    }

    contains(numberToCheck: number) {
        return numberToCheck > this.firstNumber && numberToCheck <= this.lastNumber
    }
}