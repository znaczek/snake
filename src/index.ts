import './style.css';
import {App} from './app/app';
import {Config} from './Config';

const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
if (Config.DEBUG_INTRO) {
    canvas.classList.add('debug');
}
new App(canvas, document.getElementById('keyboard')).run();
appRoot.appendChild(canvas);
