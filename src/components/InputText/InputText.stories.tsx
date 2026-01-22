import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from '.';

const meta: Meta<typeof InputText> = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-5xl mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {},
};

export const withError: Story = {
  args: {
    ...Default.args,
  },
};
