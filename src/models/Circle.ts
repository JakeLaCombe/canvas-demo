import randomcolor from 'randomcolor';

export default class Circle {
    x: number;
    y: number;
    r: number;
    color: string;
    vx: number = 10;
    vy: number = 0;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = randomcolor();
    }

    updatePhysics(canvas: HTMLCanvasElement) {
        if (this.y + this.r > canvas.height) {
            this.vy = this.vy * -0.8;
        }

        this.x = this.x += this.vx;
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }

        this.vy += 0.5;
    }

    pop () {
        this.vy += -10.0;

        if (this.vx < 0) {
            this.vx -= 0.5;
        } else {
            this.vx += 0.5;
        }
    }


}