import { EmptyTile } from "@/interface/tile/EmptyTile";
import { Tile } from "@/interface/tile/Tile";
import { FilledTile } from "@/interface/tile/FilledTile";

/* eslint-disable @typescript-eslint/naming-convention */
export class MatrixUtils {
  static readonly width = 10;
  static readonly height = 14;
  static points = [100, 300, 700, 1500];
  static maxPoint = 999999;
  static speedDelay = [700, 600, 450, 320, 240, 160];

  static getStartBoard(startLines: number = 0): Tile[] {
    if (startLines === 0) {
      return new Array(this.width * this.height).fill(new EmptyTile());
    }
    const startMatrix: Tile[] = [];

    for (let i = 0; i < startLines; i++) {
      if (i <= 2) {
        // 0-3
        startMatrix.push(...this.getRandomFilledRow(5, 8));
      } else if (i <= 6) {
        // 4-6
        startMatrix.push(...this.getRandomFilledRow(4, 9));
      } else {
        // 7-9
        startMatrix.push(...this.getRandomFilledRow(3, 9));
      }
    }

    for (let i = 0, len = this.height - startLines; i < len; i++) {
      startMatrix.unshift(...this.EmptyRow);
    }
    return startMatrix;
  }

  static getRandomFilledRow(min: number, max: number): Tile[] {
    const count = parseInt(`${(max - min + 1) * Math.random() + min}`, 10);
    const line: Tile[] = new Array(count).fill(new FilledTile(true));

    for (let i = 0, len = 10 - count; i < len; i++) {
      const index = parseInt(`${(line.length + 1) * Math.random()}`, 10);
      line.splice(index, 0, new EmptyTile());
    }

    return line;
  }

  static get EmptyRow(): Tile[] {
    return new Array(this.width).fill(new EmptyTile());
  }

  static get FullRow(): Tile[] {
    return new Array(this.width).fill(new FilledTile());
  }

  static getSpeedDelay(speed: number) {
    return this.speedDelay[speed - 1] ?? this.speedDelay[0];
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
