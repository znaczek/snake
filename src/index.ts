import './style.css';
import {App} from './app/app';
import {Config} from './config';

declare var __PRODUCTION__: boolean;

const body: HTMLElement = document.getElementsByTagName('body')[0];
const appRoot: HTMLElement = document.getElementById('app-root');
const canvas: HTMLCanvasElement = document.createElement('canvas');
const keyboard = document.getElementById('keyboard');

/* tslint:disable:no-console */
if ('serviceWorker' in navigator) {
    if (__PRODUCTION__ || Config.DEBUG_SERVICE_WORKER) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered'))
            .catch((e) => console.log('Service worker registration failed: ', e));
    } else {
        navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                for(const registration of registrations) {
                    registration.unregister()
                        .then(() => console.log('Service worker unregistered'))
                        .catch((e) => console.log('Service worker unregistration failed: ', e));
                }
            })
            .catch((e) => console.log('Failed getting service worker registrations: ', e));
    }
}
/* tslint:enable:no-console */

if (Config.DEBUG_INTRO) {
    canvas.classList.add('debug');
}

new App(canvas, keyboard).run();
appRoot.appendChild(canvas);
body.style.display = 'flex';
