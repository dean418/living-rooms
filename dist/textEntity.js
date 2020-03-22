import { Canvas } from './canvas.js';
export class TextEntity extends Canvas {
    constructor(value) {
        super();
        this.value = value;
        this.styleText();
        this.x = this.genCoord(this.width - this.textWidth);
        this.y = this.genCoord(this.height - parseInt(this.ctx.font));
        this.dx = this.genDirection();
        this.dy = this.genDirection();
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + parseInt(this.ctx.font);
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.textWidth;
    }
    drawText() {
        this.styleText();
        this.checkBounds();
        this.ctx.fillText(this.value, this.x, this.y);
    }
    intersects(entity) {
        if (this.top > entity.bottom) {
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
    genCoord(max) {
        let coord = Math.random() * max;
        return coord;
    }
    genDirection(speed = 3) {
        let direction = Math.round(Math.random());
        if (direction) {
            return speed;
        }
        return -speed;
    }
    styleText() {
        this.ctx.font = '28pt arial';
        this.ctx.fillStyle = 'white';
        this.textWidth = this.ctx.measureText(this.value).width;
    }
    checkBounds() {
        if (this.y + this.dy > this.canvas.height || this.y + this.dy < parseInt(this.ctx.font)) {
            this.dy = -this.dy;
        }
        if (this.x + this.dx > this.canvas.width - this.textWidth || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}
