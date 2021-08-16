import { Tile } from "./Tile";

export class EmptyTile extends Tile {
  constructor() {
    super(0);
    this.isSolid = false;
  }
}
