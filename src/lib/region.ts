import Range from './range'

export default class Region {
    name: string;
    range: Range;

    constructor(name: string, range: Range) {
        this.name = name;
        this.range = range;
    }
}