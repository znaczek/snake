import './style.css';
import {App} from './app/app';

const app: App = new App();
const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
app.init(canvas);
appRoot.appendChild(canvas);
