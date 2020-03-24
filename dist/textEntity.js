import { Canvas } from './canvas.js';
export class TextEntity extends Canvas {
    constructor(text) {
        super();
        this.ID = this.genID();
        this.text = text;
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
    drawText(expired = false) {
        this.styleText();
        if (!expired) {
            this.checkBounds();
        }
        this.ctx.fillText(this.text, this.x, this.y);
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
    genID() {
        return '_' + Math.random().toString(36).substr(2, 9);
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
        this.ctx.font = '18pt arial';
        this.ctx.fillStyle = 'white';
        if (this.text == 'virus') {
            this.ctx.fillStyle = 'green';
        }
        this.textWidth = this.ctx.measureText(this.text).width;
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
