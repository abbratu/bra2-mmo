import { Directive, ElementRef, OnInit, OnDestroy, NgZone, HostBinding, HostListener } from "@angular/core";
import { WebGLRenderer } from "three/src/Three.js";
import { Player, KeyboardState } from 'mmo-common-lib';
import { GameScreen } from "./game/GameScreen";
import { LoadingGameScreen } from "./game/LoadingGameScreen";
import { PlayGameScreen } from "./game/PlayGameScreen";
import { KeyboardManagerDirective } from "./game/keyboard-manager.directive";


@Directive({
    selector: 'canvas[game-canvas]'
})
export class GameCanvasDirective extends KeyboardManagerDirective implements OnInit {
    @HostBinding('attr.width')
    private width: number;

    @HostBinding('attr.height')
    private height: number;

    @HostBinding('attr.aspect')
    private aspect: number;

    private resizeObserver: ResizeObserver;

    private ws: WebSocket;
    private renderer: WebGLRenderer;
    private gameScreen: GameScreen;


    public get canvas(): HTMLCanvasElement {
        return this.element.nativeElement;
    }
    constructor(
        private readonly element: ElementRef<HTMLCanvasElement>,
        private readonly ngZone: NgZone
    ) {
        super();

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.aspect = this.width / this.height;

        this.ws = this.initWs();
        this.resizeObserver = new ResizeObserver((obs) => {
            this.ngZone.run(() => { this.onResize(obs)});
        });
        
        this.renderer = new WebGLRenderer({ canvas: this.canvas });
        this.gameScreen = new LoadingGameScreen(this.renderer, this.aspect);
    }

    ngOnInit(): void {
        this.renderer.setSize(this.width, this.height, false);
        this.gameScreen.startAnimation();
        this.resizeObserver.observe(this.canvas);
    }

    initWs(): WebSocket {
        this.ws = new WebSocket('ws://localhost:8080');
        this.ws.onmessage = (event) => {
            console.log(event.data);
        }
        this.ws.onopen = () => {
            console.log('Connected to server');
            this.gameScreen = new PlayGameScreen(this.renderer, this.aspect);
            this.gameScreen.startAnimation();
        };
        this.ws.onclose = () => {
            console.log('Disconnected from server');
            if (this.gameScreen instanceof PlayGameScreen) {
                this.gameScreen = new LoadingGameScreen(this.renderer, this.aspect);
                this.gameScreen.startAnimation();
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
        this.gameScreen.onResize(this.aspect);
    }

    override onKeyboardStateChange(): void {
        console.log(this.keyboardState);
        if (this.ws.readyState === WebSocket.OPEN) {
        }   
    }
}


