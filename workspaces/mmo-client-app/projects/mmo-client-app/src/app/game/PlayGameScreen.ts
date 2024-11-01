import { BoxGeometry, Mesh, MeshBasicMaterial, WebGLRenderer } from "three";
import { GameScreen } from "./GameScreen";

export class PlayGameScreen extends GameScreen {
    private cube: Mesh;

    constructor(
        renderer: WebGLRenderer,
        aspect: number
    ) {
        super(renderer, aspect);
        this.cube = new Mesh(
            new BoxGeometry( 1, 1, 1 ), 
            new MeshBasicMaterial( { color: 0x00ff00 } )
        );

        this.scene.add(this.cube);
        this.camera.position.z = 5;
    }

    private onAnimate(): void {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    override startAnimation(): void {
        this.renderer.setAnimationLoop(() => {
            this.onAnimate();
            this.renderer.render(this.scene, this.camera);
        });
    }
}