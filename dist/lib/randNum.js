export class RandNum {
    constructor(min, max) {
        this.num = this.genRandNum(min, max);
    }
    genRandNum(min, max) {
        let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return randNum;
    }
}
