import { describe, it, expect } from 'vitest';

import Item, { type BaseItemSchema } from './item';

describe('Test item', () => {
  const validItemFields: BaseItemSchema = {
    name: 'Item',
    content: 'This is an item.'
  };

  it('Item is valid', () => {
    const item = new Item(validItemFields);

    expect(item.validate()).toMatchObject(validItemFields);
  });

  it('Item has an empty name', () => {
    const item = new Item({ name: '' });

    expect(() => item.validate()).toThrowError('Please enter a name.');
  });

  it('Item\'s "content" is above 1000 characters', () => {
    const item = new Item({ ...validItemFields, content: validItemFields.content?.repeat(500) });

    expect(() => item.validate()).toThrowError('Content must contain up to 1000 characters.');
  });

  it('Item\'s "createdAt" is automatically set', () => {
    const item = new Item(validItemFields);

    expect(item.validate()).toHaveProperty('createdAt');
  });
});
