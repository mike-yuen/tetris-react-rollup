import { Tile } from "./Tile";

export class FilledTile extends Tile {
  constructor(isSolid = false, color?: string) {
    super(1);
    this.color = color;
    this.isSolid = isSolid;
  }
}
