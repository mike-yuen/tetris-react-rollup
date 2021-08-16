import { Tile } from "./Tile";

export class AnimatedTile extends Tile {
  constructor(isSolid = false) {
    super(2);
    this.isSolid = isSolid;
  }
}
