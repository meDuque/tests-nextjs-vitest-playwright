'use client';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '.';

const user = userEvent.setup();
describe('<TodoForm /> (integration)', () => {
  test('deve renderizar todos os componentes do form', () => {});
  test('deve chamar a action com os valores corretos', () => {});
  test('deve cortar espaços do inicio e fim da descrição (trim)', () => {});
  test('deve limpar o input se o formulario retornar sucesso', () => {});
  test('deve desativar o botão enquanto envia a action', () => {});
  test('deve desativar o input enquanto envia a action', () => {});
  test('deve trocar o texto do botão enquanto envia a action', () => {});
  test('deve mostrar o erro quando a action retornar erro', () => {});
  test('deve manter o texto no input se a action retornar erro', () => {});
});
