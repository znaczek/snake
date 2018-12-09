import './style.css';
import {App} from './app/app';
import {Config} from './Config';

const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
const keyboard = document.getElementById('keyboard');

if (Config.DEBUG_INTRO) {
    canvas.classList.add('debug');
}

new App(canvas, keyboard).run();
appRoot.appendChild(canvas);
keyboard.style.display = 'block';
