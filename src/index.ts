import './style.css';
import {App} from './app/app';

const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
new App(canvas).run();
appRoot.appendChild(canvas);
