export type TileValue = 0 | 1 | 2;

export class Tile {
  public isSolid: boolean;
  public color: string | undefined;
  private value: TileValue;

  constructor(value: TileValue) {
    this.value = value;
  }

  get isFilled(): boolean {
    return this.value === 1;
  }

  get isAnimated(): boolean {
    return this.value === 2;
  }
}
