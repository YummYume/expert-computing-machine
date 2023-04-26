import { describe, it, expect, vi } from 'vitest';

import List from './list';
import Item from './item';
import User from './user';

vi.mock('../service/mail-sender', async (importOriginal) => {
  const mod = await importOriginal() as {};

  return {
    ...mod,
    default: (user: User) => {
      console.log(`Sending email to ${user.fullName}.`);

      return true;
    }
  }
});

describe('Test list', () => {
  const validItems = [
    new Item({ name: 'Item 1' }),
    new Item({ name: 'Item 2' }),
    new Item({ name: 'Item 3' }),
  ];

  it('List is valid', () => {
    const list = new List(validItems);

    expect(list.validate()).toStrictEqual({ items: validItems.map((item) => ({ ...item })), lastAddedAt: undefined });
  });

  it('List has more than 10 items', () => {
    const list = new List([...Array(10)].map((v, i) => new Item({ name: `Item ${v} ${i}` })));

    expect(() => list.addItem(new Item({ name: 'Item 11' }))).toThrowError('A list can contain up to 10 items.');
  });

  it('List has 2 items with the same name', () => {
    const list = new List(validItems);

    expect(() => list.addItem(new Item({ name: 'Item 1' }))).toThrowError('Item names must be unique.');
  });

  it('Less than 30 minutes passed between 2 additions', () => {
    const list = new List();

    list.addItem(new Item({ name: 'Item 1' }));

    expect(() => list.addItem(new Item({ name: 'Item 2' }))).toThrowError('You must wait at least 30 minutes before adding a new item.');
  });

  it('Send an email if item count in list is 8', () => {
    const list = new List([...Array(7)].map((v, i) => new Item({ name: `Item ${v} ${i}` })));
    const newItem = list.addItem(new Item({ name: 'Item 8' }), new User({
      firstname: 'Jeff',
      lastname: 'Hello',
      email: 'jeff@hello.com',
      password: 'xxxxxxX1',
      age: 25,
      lists: [],
    }));

    expect(newItem).toEqual(true);
  });
});
