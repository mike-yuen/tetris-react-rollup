import { Tile } from "./Tile";

export class FilledTile extends Tile {
  constructor(isSolid = false) {
    super(1, isSolid);
  }
}
