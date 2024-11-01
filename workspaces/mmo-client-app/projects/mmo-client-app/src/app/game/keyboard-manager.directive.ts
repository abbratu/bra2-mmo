import { Directive, HostListener } from "@angular/core";
import { KeyboardState } from "mmo-common-lib";

@Directive({})
export abstract class KeyboardManagerDirective {
    protected keyboardState: KeyboardState = {keys: { down: false, up: false, left: false, right: false }};

    @HostListener('window:keydown.ArrowUp', ['$event'])
    @HostListener('window:keydown.w', ['$event'])
    @HostListener('window:keydown.W', ['$event'])
    onArrowUpDown(event: KeyboardEvent): void {
        this.keyboardState.keys.up = true;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keyup.ArrowUp', ['$event'])
    @HostListener('window:keyup.w', ['$event'])
    @HostListener('window:keyup.W', ['$event'])
    onArrowUpUp(event: KeyboardEvent): void {
        this.keyboardState.keys.up = false;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keydown.ArrowDown', ['$event'])
    @HostListener('window:keydown.s', ['$event'])
    @HostListener('window:keydown.S', ['$event'])
    onArrowDownDown(event: KeyboardEvent): void {
        this.keyboardState.keys.down = true;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keyup.ArrowDown', ['$event'])
    @HostListener('window:keyup.s', ['$event'])
    @HostListener('window:keyup.S', ['$event'])
    onArrowDownUp(event: KeyboardEvent): void {
        this.keyboardState.keys.down = false;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keydown.ArrowLeft', ['$event'])
    @HostListener('window:keydown.a', ['$event'])
    @HostListener('window:keydown.A', ['$event'])
    onArrowLeftDown(event: KeyboardEvent): void {
        this.keyboardState.keys.left = true;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keyup.ArrowLeft', ['$event'])
    @HostListener('window:keyup.a', ['$event'])
    @HostListener('window:keyup.A', ['$event'])
    onArrowLeftUp(event: KeyboardEvent): void {
        this.keyboardState.keys.left = false;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keydown.ArrowRight', ['$event'])
    @HostListener('window:keydown.d', ['$event'])
    @HostListener('window:keydown.D', ['$event'])
    onArrowRightDown(event: KeyboardEvent): void {
        this.keyboardState.keys.right = true;
        this.onKeyboardStateChange();
    }

    @HostListener('window:keyup.ArrowRight', ['$event'])
    @HostListener('window:keyup.d', ['$event'])
    @HostListener('window:keyup.D', ['$event'])
    onArrowRightUp(event: KeyboardEvent): void {
        this.keyboardState.keys.right = false;
        this.onKeyboardStateChange();
    }

    abstract onKeyboardStateChange(): void;
}