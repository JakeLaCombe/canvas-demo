import Circle from "../models/Circle";

class FinalApp {
   canvas: HTMLCanvasElement = document.createElement("canvas");
   timeout?: NodeJS.Timeout;
   circles: Circle[];
    constructor() {
        // create the canvas html element and attach it to the webpage
        this.canvas.id = "gameCanvas";
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        
        document.body.appendChild(this.canvas);
        // initialize babylon scene and engine

        this.circles = [];
        this.circles.push(new Circle(50, 80, 30));
        this.circles.push(new Circle(800, 100, 30));
        this.circles.push(new Circle(1400, 150, 30));
        this.circles.push(new Circle(1200, 60, 30));

        this.init = this.init.bind(this);
        this.redraw = this.redraw.bind(this);
        this.clickCanvas = this.clickCanvas.bind(this);
        this.canvas.addEventListener('mousedown', this.clickCanvas);
    }

    redraw() {
        const context = this.canvas.getContext('2d');

        if (!context) {
            return;
        }

        context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);

        this.circles.forEach((circle) => {
            context.fillStyle = circle.color;
            context.beginPath();
            context.arc(circle.x, circle.y, circle.r, 0, 360);
            context.fill();
            circle.updatePhysics(this.canvas);
        })

    }

    clickCanvas() {
        this.circles.forEach((circle) => {
            circle.pop();
        })
    }

    async init() {
       this.timeout = setTimeout(() => {
           this.redraw();
           this.init();
       }, 1000 / 60)
    }
}

const app = new FinalApp();
app.init();
