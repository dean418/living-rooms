export class Canvas {
	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected width: number;
	protected height: number;
	private textEntities: any[];

	constructor(textEntity?: any[]) {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.textEntities = textEntity;
	}

	public init(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.requestAnimationFrame(this.main.bind(this));
	}

	private main(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (let i = 0; i < this.textEntities.length; i++) {
			this.textEntities[i].drawText();
			for(let j = 0; j < this.textEntities.length; j++) {
				if (i != j && this.textEntities[j].intersects(this.textEntities[i])) {
					// collision detected
				}
			}

		}
		window.requestAnimationFrame(this.main.bind(this));
	}
}