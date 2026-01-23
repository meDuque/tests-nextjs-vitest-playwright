import { render, screen } from '@testing-library/react';
import { InputText, type InputTextProps } from '.';

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole('textbox');
  return { input, renderResult };
};

const input = (p?: Props) => renderInput(p).input;

describe('<InputText />', () => {
  describe('Comportamento padrão', () => {
    test('Deve renderizar com label', async () => {
      const el = input({ labelText: 'novo label' });
      const label = screen.getByLabelText(/novo label/i);

      expect(el).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });
    test('Deve renderizar com placeholder', async () => {
      const el = input({ placeholder: 'novo placeholder' });

      expect(el).toHaveAttribute('placeholder', 'novo placeholder');
    });

    test('Deve renderizar sem placeholder', async () => {
      const el = input({ placeholder: undefined });

      expect(el).not.toHaveAttribute('placeholder');
    });
    test('Deve renderizar sem label', async () => {
      const el = input({ labelText: undefined });
      const label = screen.queryByRole('novo label');

      expect(el).toBeInTheDocument();
      expect(label).not.toBeInTheDocument();
    });

    test('Deve usar labelText comp aria-label quando possível', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label');
    });
    test('Deve usar placeholder como fallback de aria-label', async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        'aria-label',
        'placeholder',
      );
    });

    test('Deve exibir o valor padrão corretamente', async () => {
      expect(input({ defaultValue: 'valor' })).toHaveValue('valor');
    });
    test('Deve aceitar outras props do JSX (data-testid, max-length)', async () => {
      const el = input({ name: 'name', maxLength: 10 });

      expect(el).toHaveAttribute('name', 'name');
      expect(el).toHaveAttribute('maxLength', '10');
    });
  });

  describe('Acessibilidade', () => {
    test('Não deve exibir mensagem de erro por padrão', async () => {
      const el = input();

      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
    test('Não deve marcar o input como inválido por padrão', async () => {
      const el = input();

      expect(el).toHaveAttribute('aria-invalid', 'false');
    });
    test('Deve renderizar a mensagem de erro quando `errorMessage` é passada', async () => {
      const el = input({ errorMessage: 'Tem erro' });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');

      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });

  // describe('Comportamento interativo', () => {
  //   test('Deve atualizar o valor conforme o usuário digita', async () => {});
  // });

  // describe('Estados visuais', () => {
  //   test('Deve aplicar classes visuais quando desabilitado', async () => {});
  //   test('Deve aplicar classes visuais quando readonly', async () => {});

  //   test('Deve adicionar classe de erro (ring vermelha) quando inválido', async () => {});
  //   test('Deve manter classes personalizadas do desenvolvedor', async () => {});
  // });
});
