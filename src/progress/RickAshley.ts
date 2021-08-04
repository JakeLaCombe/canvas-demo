import Circle from "../models/Circle";
import rickVideo from "../assets/movie.mp4";
import VideoClip from "../models/VideoClip";

export class RickAshley {
   canvas: HTMLCanvasElement = document.createElement("canvas");
   video: HTMLVideoElement = document.createElement("video");
   timeout?: NodeJS.Timeout;
   shuffledArray: number[] = [];
   rickClips: VideoClip[];

   constructor() {
        // create the canvas html element and attach it to the webpage
        this.canvas.id = "gameCanvas";
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        document.body.appendChild(this.canvas);
        
        this.init = this.init.bind(this);
        this.redraw = this.redraw.bind(this);
        this.instantiateRickClips = this.instantiateRickClips.bind(this);

        document.body.appendChild(this.video);

        let columns = 4;
        let rows = 4;
        let randomArray = Array.from(Array(columns * rows).keys());
        this.shuffleArray(randomArray);
        this.shuffledArray = randomArray;

        this.video.src = rickVideo;
        this.rickClips = this.instantiateRickClips();

    }

    instantiateRickClips(): VideoClip[] {
        let columns = 8;
        let rows = 4;
        let tileWidth = this.video.clientWidth / columns;
        let tileHeight = this.video.clientHeight / rows;

        let randomArray = Array.from(Array(columns * rows).keys());
        let clips = this.shuffleArray(randomArray);
        this.shuffledArray = randomArray;

        return clips.map((i, index) => {
            let row = Math.floor(index / columns);
            let column = index % columns;

            return new VideoClip({
                video: this.video,
                x: tileWidth * (index % columns),
                y: tileHeight * Math.floor(index / columns),
                width: tileWidth,
                height: tileHeight,
                sx: tileWidth * (i % columns),
                sy: tileHeight * Math.floor(i / columns),
            })
        })
    }

    redraw() {
        if (this.video.readyState === 4) {
            console.log("Video is Reeady");

            if (this.video.paused) {
                this.rickClips = this.instantiateRickClips();
            }
            this.video.play();
            this.video.style.visibility = "hidden";
        }

        let context = this.canvas.getContext("2d");

        if (!context) {
            return;
        }

        // this.invertColors(context);
        // this.mixup(context);
        this.normal(context);

        window.requestAnimationFrame(this.redraw);
    }

    invertColors(context: CanvasRenderingContext2D)
    {
        context.clearRect(0,0, this.canvas.width, this.canvas.height);
        context.drawImage(this.video, 10, 10);
        let imageData = context.getImageData(10, 10, this.video.clientWidth, this.video.clientHeight);

        for (let i = 0; i < imageData.data.length; i++) {
            imageData.data[i] = Math.abs(128 - imageData.data[i]);
            imageData.data[i+1] = Math.abs(128 - imageData.data[i + 1]);
            imageData.data[i+2] = Math.abs(128 - imageData.data[i + 2]);
        }

        context.putImageData(imageData, 10, 10);
    }

    normal(context: CanvasRenderingContext2D)
    {
        context.clearRect(0,0, this.canvas.width, this.canvas.height);
        context.drawImage(this.video, 10, 10);
    }

    mixup(context: CanvasRenderingContext2D)
    {   
        context.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.rickClips.forEach((rickVideo) => {
            rickVideo.updatePhysics(this.canvas);
        })
    }

    shuffleArray(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
   

    async init() {
       window.requestAnimationFrame(this.redraw);
    }
}
