import {Pixel} from '../../../common/model/pixel.model';
import {Config} from '../../../../Config';
import {Position} from '../../../common/model/position.model';

export class Mazez {
    public static getPixels(level: number): Pixel[] {
        return Mazez.mazez[level];
    }

    public static getForbiddenPixels(level: number): Position[] {
        return Mazez.mazezForbiddenPixels[level];
    }

    private static readonly mazez: {[index: number]: Pixel[]} = {
        1: [],
        2: ((): Pixel[] => {
            return Mazez.getBasicBorderPixels();
        })(),
        3: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = Config.MOVE * 2; x < Config.BOARD_WIDTH - Config.MOVE * 2 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, Config.BOARD_HEIGHT / 2 - 1),
                );
            }
            for (let y = Config.MOVE * 2; y < Config.BOARD_HEIGHT - Config.MOVE * 2 - 1; y += 1) {
                pixels.push(
                    new Pixel(Config.BOARD_WIDTH / 2 - 1, y),
                );
            }
            return pixels;
        })(),
        4: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = Config.MOVE * 2; x < Config.BOARD_WIDTH - Config.MOVE * 2 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, Config.BOARD_HEIGHT / 4),
                    new Pixel(x, Config.BOARD_HEIGHT - (Config.BOARD_HEIGHT / 4) - 2),
                );
            }
            return pixels;
        })(),
        5: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = Config.MOVE * 2; x < Config.BOARD_WIDTH / 2; x += 1) {
                pixels.push(
                    new Pixel(x, Config.MOVE * 2 + 1),
                    new Pixel(x + Config.BOARD_WIDTH / 2 - Config.MOVE * 2 - 1, Config.BOARD_HEIGHT - Config.MOVE * 2 - 3),
                );
            }
            for (let y = Config.MOVE * 2; y < Config.BOARD_HEIGHT / 2; y += 1) {
                pixels.push(
                    new Pixel(Config.MOVE * 2 + 1, y + Config.BOARD_HEIGHT / 2 - Config.MOVE * 2 - 2),
                    new Pixel(Config.BOARD_WIDTH - Config.MOVE * 2 - 3, y),
                );
            }
            return pixels;
        })(),
        6: ((): Pixel[] => {
            const pixels: Pixel[] = [];
            for (let x = Config.MOVE * 4; x < Config.BOARD_WIDTH - Config.MOVE * 4 - 1; x += 1) {
                pixels.push(
                    new Pixel(x, Config.BOARD_HEIGHT / 2 - 1),
                );
            }
            return [...pixels, ...Mazez.getBasicBorderPixels()];
        })(),
    };

    // in case of forbidden pixels would differ from those regular
    private static readonly mazezForbiddenPixels: {[index: number]: Position[]} = {
        1: [],
        2: Mazez.mazez[2].map((pixel: Pixel) => new Position(pixel.x, pixel.y)),
        3: Mazez.mazez[3].map((pixel: Pixel) => new Position(pixel.x, pixel.y)),
        4: Mazez.mazez[4].map((pixel: Pixel) => new Position(pixel.x, pixel.y)),
        5: Mazez.mazez[5].map((pixel: Pixel) => new Position(pixel.x, pixel.y)),
        6: Mazez.mazez[6].map((pixel: Pixel) => new Position(pixel.x, pixel.y)),
    };

    private static getBasicBorderPixels(): Pixel[] {
        const pixels: Pixel[] = [];
        for (let x = 1; x < Config.BOARD_WIDTH - 1; x += 1) {
            pixels.push(
                new Pixel(x, 2),
                new Pixel(x, 1),
                new Pixel(x, Config.BOARD_HEIGHT - 3),
                new Pixel(x, Config.BOARD_HEIGHT - 2),
            );
        }
        for (let y = 1; y < Config.BOARD_HEIGHT - 1; y += 1) {
            pixels.push(
                new Pixel(2, y),
                new Pixel(1, y),
                new Pixel(Config.BOARD_WIDTH - 3, y),
                new Pixel(Config.BOARD_WIDTH - 2, y),
            );
        }
        return pixels;
    }
}
