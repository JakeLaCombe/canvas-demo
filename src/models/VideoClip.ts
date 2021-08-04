interface Args {
    video: HTMLVideoElement;
    x: number;
    y: number;
    sx: number;
    sy: number;
    width: number;
    height: number;
}

export default class VideoClip {
    video: HTMLVideoElement;
    x: number;
    y: number;

    sx: number;
    sy: number;
    width: number;
    height: number;

    constructor({video, x, y, sx, sy, width, height}: Args) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.width = width;
        this.height = height;
        this.video = video;
    }

    updatePhysics(canvas: HTMLCanvasElement) {
       let context = canvas.getContext('2d');

       if (!context) {
           return;
       }

       context.drawImage(
           this.video,
           this.sx,
           this.sy,
           this.width,
           this.height,
           this.x,
           this.y,
           this.width,
           this.height);
    }

}