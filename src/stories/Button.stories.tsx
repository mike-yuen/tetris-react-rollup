import Button from "@/components/Button";
import { ButtonProps } from "@/components/Button/Button.types";
import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import "@/components/Button/Button.scss"

export default {
  title: "Controls/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "$",
} as ButtonProps;

export const OnClick = Template.bind({});
OnClick.args = {
  children: "Click Me!",
  onClick: () => {
    alert("Click Action!");
  },
} as ButtonProps;
