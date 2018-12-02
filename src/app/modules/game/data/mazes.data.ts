import {Pixel} from '../../../common/model/pixel.model';
import * as config from '../../../../config';

export class Mazez {
    public static getPixels(level: number): Pixel[] {
        return Mazez.mazez[level];
    }

    public static getForbiddenPixels(level: number): Pixel[] {
        return Mazez.mazezForbiddenPixels[level];
    }

    private static readonly mazez: {[index: number]: Pixel[]} = {
        1: [],
        2: ((): Pixel[] => {
            return Mazez.getBasicBorderPixels();
        })(),
        3: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = config.MOVE * 2; x < config.BOARD_WIDTH - config.MOVE * 2 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, config.BOARD_HEIGHT / 2 - 1),
                );
            }
            for (let y = config.MOVE * 2; y < config.BOARD_HEIGHT - config.MOVE * 2 - 1; y += 1) {
                pixels.push(
                    new Pixel(config.BOARD_WIDTH / 2 - 1, y),
                );
            }
            return pixels;
        })(),
        4: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = config.MOVE * 2; x < config.BOARD_WIDTH - config.MOVE * 2 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, config.BOARD_HEIGHT / 4),
                    new Pixel(x, config.BOARD_HEIGHT - (config.BOARD_HEIGHT / 4) - 2),
                );
            }
            return pixels;
        })(),
        5: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = config.MOVE * 2; x < config.BOARD_WIDTH / 2; x += 1) {
                pixels.push(
                    new Pixel(x, config.MOVE * 2 + 1),
                    new Pixel(x + config.BOARD_WIDTH / 2 - config.MOVE * 2 - 1, config.BOARD_HEIGHT - config.MOVE * 2 - 3),
                );
            }
            for (let y = config.MOVE * 2; y < config.BOARD_HEIGHT / 2; y += 1) {
                pixels.push(
                    new Pixel(config.MOVE * 2 + 1, y + config.BOARD_HEIGHT / 2 - config.MOVE * 2 - 2),
                    new Pixel(config.BOARD_WIDTH - config.MOVE * 2 - 3, y),
                );
            }
            return pixels;
        })(),
        6: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = config.MOVE * 4; x < config.BOARD_WIDTH - config.MOVE * 4 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, config.BOARD_HEIGHT / 2 - 1),
                );
            }
            return [...pixels, ...Mazez.getBasicBorderPixels()];
        })(),
    };

    // in case of forbidden pixels would differ from those regular
    private static readonly mazezForbiddenPixels: {[index: number]: Pixel[]} = {
        1: [],
        2: Mazez.mazez[2],
        3: Mazez.mazez[3],
        4: Mazez.mazez[4],
        5: Mazez.mazez[5],
        6: Mazez.mazez[6],
    };

    private static getBasicBorderPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        for (let x = 1; x < config.BOARD_WIDTH - 1; x += 1) {
            pixels.push(
                new Pixel(x, 2),
                new Pixel(x, 1),
                new Pixel(x, config.BOARD_HEIGHT - 3),
                new Pixel(x, config.BOARD_HEIGHT - 2),
            );
        }
        for (let y = 1; y < config.BOARD_HEIGHT - 1; y += 1) {
            pixels.push(
                new Pixel(2, y),
                new Pixel(1, y),
                new Pixel(config.BOARD_WIDTH - 3, y),
                new Pixel(config.BOARD_WIDTH - 2, y),
            );
        }
        return pixels;
    }
}
