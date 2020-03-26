export class RandNum {
	public num: number;

	constructor(min: number, max: number) {
		this.num = this.genRandNum(min, max);
	}

	private genRandNum(min: number, max: number): number {
		let randNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
		return randNum;
	}
}