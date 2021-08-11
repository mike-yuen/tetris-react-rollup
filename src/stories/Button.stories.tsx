import Button from "@/components/Button";
import { ButtonProps } from "@/components/Button/Button.types";
import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import "@/components/Button/Button.scss";

export default {
  title: "Atom/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 32,
  theme: "light",
  type: "up",
} as ButtonProps;

export const OnMouseDown = Template.bind({});
OnMouseDown.args = {
  size: 32,
  theme: "dark",
  type: "refresh",
  onMouseDown: () => {
    console.log("on Mouse Down Action!");
  },
} as ButtonProps;
