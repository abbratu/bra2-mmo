import { Directive, ElementRef, OnInit, OnDestroy, NgZone } from "@angular/core";
import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three/src/Three.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";


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

    startAnimation(): void {
        this.renderer.setAnimationLoop(() => {
            this.onAnimate();
            this.renderer.render(this.scene, this.camera);
        });
    }

    abstract onAnimate(): void
}

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

    onAnimate(): void {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}

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

    override onAnimate(): void {
    }
}
@Directive({
    selector: 'canvas[game-canvas]'
})
export class GameCanvasDirective implements OnInit {
    private ws: WebSocket;
    private resizeObserver: ResizeObserver;

    private width: number;
    private height: number;
    private aspect: number;

    private renderer: WebGLRenderer;
    private gs: GameScreen;

    public get canvas(): HTMLCanvasElement {
        return this.element.nativeElement;
    }
    constructor(
        private readonly element: ElementRef<HTMLCanvasElement>,
        private readonly ngZone: NgZone
    ) {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.aspect = this.width / this.height;

        this.ws = this.initWs();
        this.resizeObserver = new ResizeObserver((obs) => {
            this.ngZone.run(() => { this.onResize(obs)});
        });
        
        this.renderer = new WebGLRenderer({ canvas: this.canvas });
        this.gs = new LoadingGameScreen(this.renderer, this.aspect);
    }

    ngOnInit(): void {
        this.renderer.setSize(this.width, this.height, false);
        this.gs.startAnimation();
        this.resizeObserver.observe(this.canvas);
    }


    initWs(): WebSocket {
        this.ws = new WebSocket('ws://localhost:8080');
        this.ws.onmessage = (event) => {
            console.log(event.data);
        }
        this.ws.onopen = () => {
            console.log('Connected to server');
            this.gs = new PlayGameScreen(this.renderer, this.aspect);
            this.gs.startAnimation();
        };
        this.ws.onclose = () => {
            console.log('Disconnected from server');
            if (this.gs instanceof PlayGameScreen) {
                this.gs = new LoadingGameScreen(this.renderer, this.aspect);
                this.gs.startAnimation();
            }

            this.initWs();
        };
        this.ws.onerror = (error) => {
            console.error('Error:', error);
        };

        return this.ws;
    }

    ngOnDestroy(): void {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        }
    }

    onResize([canvas]: ResizeObserverEntry[]): void {
        this.width = canvas.contentRect.width;
        this.height = canvas.contentRect.height;
        this.aspect = this.width / this.height;
        
        this.renderer.setSize(this.width, this.height, false);
        this.gs.onResize(this.aspect);
    }
}