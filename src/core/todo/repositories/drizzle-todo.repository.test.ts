import {
  insertTestTodos,
  makeTestTodoRepository,
} from '@/core/___tests__/utils/make-test-todo-repository';

describe('DrizzleTodoRepository (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();

      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test('deve retornar todos os TODOs em ordem decrescente ', async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();

      expect(result).toHaveLength(5);
      expect(result[0].createdAt).toBe('date 4');
      expect(result[1].createdAt).toBe('date 3');
      expect(result[2].createdAt).toBe('date 2');
      expect(result[3].createdAt).toBe('date 1');
      expect(result[4].createdAt).toBe('date 0');
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
