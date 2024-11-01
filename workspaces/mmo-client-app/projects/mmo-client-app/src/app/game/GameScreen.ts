import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export abstract class GameScreen {
    protected readonly scene: Scene;
    protected readonly camera: PerspectiveCamera;

    constructor(
        protected readonly renderer: WebGLRenderer,
        aspect: number
    ) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, aspect, 0.1, 1000);
    }

    onResize(aspect: number): void {    
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    abstract startAnimation(): void ;
}