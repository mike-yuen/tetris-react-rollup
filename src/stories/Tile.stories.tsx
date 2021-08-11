import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import Tile from "@/components/Tile";
import { TileProps } from "@/components/Tile/Title.types";
import "@/components/Tile/Tile.scss";

export default {
  title: "Atom/Tile",
  component: Tile,
} as Meta;

const Template: Story<TileProps> = (args) => <Tile {...args} />;

export const RedTile = Template.bind({});
RedTile.args = {
  color: "red",
  filled: true,
  animated: false,
} as TileProps;
