import Circle from "./models/Circle";
import rickVideo from "./assets/movie.mp4";
import VideoClip from "./models/VideoClip";
import { RickAshley } from "./progress/RickAshley";
import { FinalApp } from "./progress/FinalApp";

class App {
   canvas: HTMLCanvasElement = document.createElement("canvas");
   timeout?: NodeJS.Timeout;

   constructor() {
        // create the canvas html element and attach it to the webpage
        this.canvas.id = "gameCanvas";
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        document.body.appendChild(this.canvas);
        
        this.init = this.init.bind(this);
        this.redraw = this.redraw.bind(this);
    }

    redraw() {
        window.requestAnimationFrame(this.redraw);
    }
   

    async init() {
       window.requestAnimationFrame(this.redraw);
    }
}

const app = new App();
app.init();
