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
}