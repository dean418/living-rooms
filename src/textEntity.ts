import {Canvas} from './canvas.js';

export abstract class TextEntity extends Canvas {
	private value: string;
	private textWidth: number;
	private x: number;
	private y: number;
	private dx: number;
	private dy: number;

	constructor(value: string) {
		super();
		this.value = value;

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

	public drawText(): void {
		this.styleText();
		this.checkBounds();
		this.ctx.fillText(this.value, this.x, this.y);
	}

	public intersects(entity): boolean {

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
		this.textWidth = this.ctx.measureText(this.value).width;
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