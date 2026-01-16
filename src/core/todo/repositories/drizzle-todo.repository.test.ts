import { makeTestTodoRepository } from '@/core/___tests__/utils/make-test-todo-repository';

describe('DrizzleTodoRepository (integration)', () => {
  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {
      // TODO Implementação do teste
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();

      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test('deve retornar todos os TODOs em ordem decrescente ', async () => {
      // Implementação do teste
    });
  });

  // describe('create', () => {
  //   test('deve criar um TODO se os dados forem válidos', async () => {
  //     // Implementação do teste
  //   });

  //   test('deve falhar ao criar um TODO com descrição duplicada', async () => {
  //     // Implementação do teste
  //   });

  //   test('deve falhar ao criar um TODO com ID duplicado', async () => {
  //     // Implementação do teste
  //   });
  // });

  // describe('remove', () => {
  //   test('deve remover um TODO se ele existir', async () => {
  //     // Implementação do teste
  //   });

  //   test('deve falhar ao remover um TODO que não existe', async () => {
  //     // Implementação do teste
  //   });
  // });
});
