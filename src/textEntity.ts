import {Canvas} from './canvas.js';

export abstract class TextEntity extends Canvas {
	protected text: string;
	private textWidth: number;
	public x: number;
	public y: number;
	private dx: number;
	private dy: number;

	constructor(text: string) {
		super();
		this.text = text;

		this.styleText();

		this.x = this.genCoord(this.width - this.textWidth);
		this.y = this.genCoord(this.height - parseInt(this.ctx.font));
		this.dx = this.genDirection();
		this.dy = this.genDirection();
	}

	public get top(): number {
		return this.y;
	}

	public get bottom(): number {
		return this.y + parseInt(this.ctx.font);
	}

	public get left(): number {
		return this.x;
	}

	public get right(): number {
		return this.x + this.textWidth;
	}

	public drawText(expired: boolean=false): void {
		this.styleText();

		if (!expired) {
			this.checkBounds();
		}

		this.ctx.fillText(this.text, this.x, this.y);
	}

	public intersects(entity: TextEntity): boolean {

		if(this.top > entity.bottom) {
			return false;
		}

		if (this.right < entity.left) {
			return false;
		}

		if (this.bottom < entity.top) {
			return false;
		}

		if (this.left > entity.right) {
			return false;
		}

		return true;
	}

	private genCoord(max: number): number {
		let coord: number = Math.random() * max;

		return coord;
	}

	private genDirection(speed:number=3): number {
		let direction: number = Math.round(Math.random());

		if(direction) {
			return speed;
		}
		return -speed;
	}

	private styleText(): void {
		this.ctx.font = '28pt arial';
		this.ctx.fillStyle = 'white';
		this.textWidth = this.ctx.measureText(this.text).width;
	}

	private checkBounds(): void {
		if(this.y + this.dy > this.canvas.height || this.y + this.dy < parseInt(this.ctx.font)) {
			this.dy = -this.dy;
		}

		if(this.x + this.dx > this.canvas.width - this.textWidth || this.x + this.dx < 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
	}
}