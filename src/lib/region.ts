import Interval from './interval'

export default class Region {
    name: string;
    interval: Interval;

    constructor(name: string, interval: Interval) {
        this.name = name;
        this.interval = interval;
    }
}