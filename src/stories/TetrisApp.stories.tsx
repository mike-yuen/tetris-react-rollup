import TetrisApp from "@/components/TetrisApp";
import { TetrisAppProps } from "components/TetrisApp/TetrisApp.types";
import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import "@/components/TetrisApp/TetrisApp.scss"

export default {
  title: "Foundation/TetrisApp",
  component: TetrisApp,
} as Meta;

const Template: Story<TetrisAppProps> = (args) => <TetrisApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "light",
} as TetrisAppProps;
