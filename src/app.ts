import Circle from "./models/Circle";

class App {
   canvas: HTMLCanvasElement = document.createElement("canvas");
   timeout?: NodeJS.Timeout;

   constructor() {
        // create the canvas html element and attach it to the webpage
        this.canvas.id = "gameCanvas";
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        document.body.appendChild(this.canvas);
        
        this.init = this.init.bind(this);
        this.redraw = this.redraw.bind(this);
    }

    redraw() {
       
    }

   

    async init() {
       
    }
}

const app = new App();
app.init();
