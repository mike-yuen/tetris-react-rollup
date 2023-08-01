import { Meta, StoryFn } from "@storybook/react";

import Tile from "@/components/Tile";
import { TileProps } from "@/components/Tile/Title.types";
import "@/components/Tile/Tile.scss";

export default {
  title: "Atom/Tile",
  component: Tile,
} as Meta;

const Template: StoryFn<TileProps> = (args) => <Tile {...args} />;

export const RedTile = Template.bind({});
RedTile.args = {
  color: "red",
  filled: true,
  animated: false,
} as TileProps;
