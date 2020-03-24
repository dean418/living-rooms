export class Canvas {
	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected width: number;
	protected height: number;
	protected textEntities: any[];

	constructor(textEntity?: any[]) {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.textEntities = textEntity;
	}

	public genRandNum(min: number, max: number): number {
		let randInt: number = Math.floor(Math.random() * (max - min + 1)) + min;
		return randInt;
	}
}