import { Meta, StoryFn } from "@storybook/react";

import TetrisApp from "@/components/TetrisApp";
import { TetrisAppProps } from "components/TetrisApp/TetrisApp.types";
import "@/components/TetrisApp/TetrisApp.scss";

export default {
  title: "Foundation/TetrisApp",
  component: TetrisApp,
} as Meta;

const Template: StoryFn<TetrisAppProps> = (args) => <TetrisApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "light",
} as TetrisAppProps;
