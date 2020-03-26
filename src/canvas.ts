export class Canvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public width: number;
	public height: number;
	public textEntities: object;

	constructor(textEntity?: object) {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.textEntities = textEntity;

		this.setup();
	}

	private setup() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

	}
}