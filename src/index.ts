import './style.css';
import {App} from './app/app';
import * as config from './config';

const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
if (config.DEBUG_INTRO) {
    canvas.classList.add('debug');
}
new App(canvas).run();
appRoot.appendChild(canvas);
