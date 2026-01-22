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
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      description: 'Este é o tipo do input',
    },
    labelText: {
      control: 'text',
      description: 'Label text do input',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro ao usuário',
    },
    placeholder: {
      control: 'text',
      description: 'Exemplo de uso para o input',
    },
    required: {
      control: 'boolean',
      description: 'O campo é requerido',
    },
    disabled: {
      control: 'boolean',
      description: 'O campo está desativado',
    },
    readOnly: {
      control: 'boolean',
      description: 'Apenas leitura',
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input label',
    errorMessage: '',
    placeholder: 'Digite Algo...',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'Valor padrão do input',
  },
};

export const withError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Esta é a mensagem de erro',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
