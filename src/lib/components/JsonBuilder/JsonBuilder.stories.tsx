import type { Meta, StoryObj } from "@storybook/react";
import JsonBuilder, { BuilderProps } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<BuilderProps> = {
  title: "JsonBuilder",
  component: JsonBuilder,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    initJson: { control: "object" },
    onChange: { action: "onChange" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Builder: Story = {
  render: (args) => (
    <div className="w-[980px]">
      <JsonBuilder {...args} />
    </div>
  ),
  args: {
    initJson: {
      name: "John Doe",
      age: 30,
      address: { city: "New York", state: "NY" },
    },
  },
};
