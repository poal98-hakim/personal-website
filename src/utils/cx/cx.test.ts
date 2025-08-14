import { cx } from './cx';

describe('cx utility', () => {
  test('handles string inputs', () => {
    expect(cx('class1', 'class2')).toBe('class1 class2');
  });

  test('handles number inputs', () => {
    expect(cx('class1', 123, 'class2')).toBe('class1 123 class2');
  });

  test('filters out falsy values', () => {
    expect(cx('class1', false, null, undefined, '', 'class2')).toBe('class1 class2');
  });

  test('handles object inputs with truthy values', () => {
    expect(cx({ class1: true, class2: false, class3: true })).toBe('class1 class3');
  });

  test('handles object inputs with various truthy/falsy values', () => {
    expect(
      cx({
        class1: 1,
        class2: 0,
        class3: 'truthy',
        class4: '',
        class5: null,
        class6: undefined,
      })
    ).toBe('class1 class3');
  });

  test('handles array inputs', () => {
    expect(cx(['class1', 'class2', false, 'class3'])).toBe('class1 class2 class3');
  });

  test('handles nested arrays', () => {
    expect(cx('class1', ['class2', 'class3'], 'class4')).toBe('class1 class2 class3 class4');
  });

  test('handles mixed input types', () => {
    expect(
      cx('class1', { class2: true, class3: false }, ['class4', 'class5'], null, 'class6')
    ).toBe('class1 class2 class4 class5 class6');
  });

  test('returns empty string for no inputs', () => {
    expect(cx()).toBe('');
  });

  test('returns empty string for all falsy inputs', () => {
    expect(cx(false, null, undefined, '', 0)).toBe('');
  });

  test('handles complex nested structures', () => {
    expect(
      cx(
        'base',
        {
          active: true,
          disabled: false,
        },
        ['item1', 'nested1', 'nested2'],
        {
          conditional: true,
          hidden: false,
        }
      )
    ).toBe('base active item1 nested1 nested2 conditional');
  });

  test('handles empty arrays', () => {
    expect(cx('class1', [], 'class2')).toBe('class1 class2');
  });

  test('handles empty objects', () => {
    expect(cx('class1', {}, 'class2')).toBe('class1 class2');
  });
});
