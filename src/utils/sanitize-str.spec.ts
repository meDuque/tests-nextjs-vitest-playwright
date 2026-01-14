import { sanitizeStr } from './sanitize-str';

describe('sanitizeStr (unit)', () => {
  test('Retorna uma string vazia quando recebe um valor falsy', () => {
    // @ts-expect-error - testando valores inválidos
    expect(sanitizeStr()).toBe('');
    // @ts-expect-error - testando valores inválidos
    expect(sanitizeStr(null)).toBe('');
    // @ts-expect-error - testando valores inválidos
    expect(sanitizeStr(undefined)).toBe('');
  });

  test('Retorna uma string vazia quando recebe um valor que NÃO é uma string', () => {
    // @ts-expect-error - testando valores inválidos
    expect(sanitizeStr(123)).toBe('');
  });

  test('Retorna uma string sem espaços quando recebe uma string válida', () => {
    expect(sanitizeStr('  Hello World  ')).toBe('Hello World');
    expect(sanitizeStr('   Olá Mundo   ')).toBe('Olá Mundo');
  });

  test('Retorna uma string normalizada com NFC', () => {
    const strNFD = 'e\u0301'; // 'e' + combining acute accent
    const strNFC = 'é'; // precomposed 'é'

    expect(sanitizeStr(strNFD)).toBe(strNFC);
    expect(sanitizeStr(strNFC)).toBe(strNFC);
  });
});
