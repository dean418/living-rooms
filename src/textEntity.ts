import {Canvas} from './canvas.js';

export class TextEntity {
	public ID: string;
	public x: number;
	public y: number;
	private canvas: Canvas;
	public textWidth: number;
	protected text: string;
	protected dx: number;
	protected dy: number;

	constructor(text: string) {
		this.ID = this.genID();
		this.canvas = new Canvas();
		this.text = text;
		this.styleText();
		this.x = this.genCoord(this.canvas.width - this.textWidth);
		this.y = this.genCoord(this.canvas.height - parseInt(this.canvas.ctx.font));
		this.dx = this.genDirection();
		this.dy = this.genDirection();
	}

	public get top(): number {
		return this.y;
	}

	public get bottom(): number {
		return this.y + parseInt(this.canvas.ctx.font);
	}

	public get left(): number {
		return this.x;
	}

	public get right(): number {
		return this.x + this.textWidth;
	}

	public drawText(expired: boolean=false): void {
		this.styleText();

		if (expired) {

		} else {
			this.move();
		}

		this.canvas.ctx.fillText(this.text, this.x, this.y);
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

	protected move(): void {
		if (this.checkTop() || this.checkBottom()) {
			this.dy = -this.dy;
		}

		if (this.checkLeft() || this.checkRight()) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	private genID(): string {
		return '_' + Math.random().toString(36).substr(2, 9);
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

	private chooseColor(): void {
		if (this.text == 'virus') {
			this.canvas.ctx.fillStyle = 'green';
		} else if(this.text == 'food') {
			this.canvas.ctx.fillStyle = 'red';
		} else if(this.text == 'dead') {
			this.canvas.ctx.fillStyle = 'grey';
		}
	}

	private styleText(): void {
		this.canvas.ctx.font = '16pt arial';
		this.canvas.ctx.fillStyle = 'white';

		this.chooseColor();

		this.textWidth = this.canvas.ctx.measureText(this.text).width;
	}

	public checkTop(): boolean {
		if(this.y + this.dy > this.canvas.height) {
			return true;
		}
		return false;
	}

	public checkBottom(): boolean {
		if (this.y + this.dy < parseInt(this.canvas.ctx.font)) {
			return true;
		}
		return false;
	}

	public checkRight(): boolean {
		if(this.x + this.dx > this.canvas.width - this.textWidth) {
			return true;
		}
		return false;
	}

	public checkLeft(): boolean {
		if (this.x + this.dx < 0) {
			return true;
		}
		return false;
	}
}