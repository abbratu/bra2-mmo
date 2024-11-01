import { Mesh, MeshBasicMaterial, Vector3, WebGLRenderer } from "three";
import { GameScreen } from "./GameScreen";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export class LoadingGameScreen extends GameScreen {
    constructor(
        renderer: WebGLRenderer,
        aspect: number
    ) {
        super(renderer, aspect);
        this.camera.position.z = 1000;

        new FontLoader().load('fonts/helvetiker_bold.typeface.json', ( font ) => {
            const geometry = new TextGeometry( 'Loading...', {
                font: font,
                size: 80,
                // depth: 5,
                // curveSegments: 12,
                // bevelEnabled: true,
                // bevelThickness: 10,
                // bevelSize: 8,
                // bevelOffset: 0,
                // bevelSegments: 5
            });
            const material = new MeshBasicMaterial({ color: 0x00ff00 });
            const mesh = new Mesh(geometry, material);

            this.scene.add(mesh);

            const matrix = new Vector3();
            geometry.computeBoundingBox();
            const offset = geometry.boundingBox?.getCenter(matrix);

            mesh.position.x =- offset!.x;
            mesh.position.y =- offset!.y;


            // const ambientLight = new AmbientLight( 0xffffff, 0.4 );
            // this.scene.add( ambientLight );

            // const dirLight = new DirectionalLight( 0xffffff, 0.8 );
            // dirLight.position.set( 0, 1000, 0 );
            // this.scene.add( dirLight );


            
        }, (xhr) => {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        }, (err) => {
            console.log( 'An error happened', err );
        });

    }

    override startAnimation(): void {
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
        });
    }
}