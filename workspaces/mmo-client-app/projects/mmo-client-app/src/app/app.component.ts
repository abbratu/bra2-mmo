import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<canvas game-canvas></canvas>',
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      max-height: 100%;
      canvas {
        flex: 1;
        overflow: hidden;
      }
    }
  `
})
export class AppComponent {
}
