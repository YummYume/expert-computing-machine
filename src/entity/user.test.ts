import { describe, it, expect } from 'vitest';

import User, { type UserSchema } from './user';
import List from './list';

describe('Test user', () => {
  const validUserFields: UserSchema = {
    firstname: 'Jeff',
    lastname: 'Hello',
    email: 'jeff@hello.com',
    password: 'xxxxxxX1',
    age: 25,
    lists: [],
  };

  it('User is valid', () => {
    const user = new User(validUserFields);

    expect(user.validate()).toStrictEqual(validUserFields);
  });

  it('Firstname is empty', () => {
    const user = new User({ ...validUserFields, firstname: '' });

    expect(() => user.validate()).toThrowError('Please enter a firstname.');
  });

  it('Lastname is empty', () => {
    const user = new User({ ...validUserFields, lastname: '' });

    expect(() => user.validate()).toThrowError('Please enter a lastname.');
  });

  it('Email is invalid', () => {
    const user = new User({ ...validUserFields, email: 'jeff' });

    expect(() => user.validate()).toThrowError('Please enter a valid email address.');
  });

  it('Password is too short', () => {
    const user = new User({ ...validUserFields, password: 'xxx1A' });

    expect(() => user.validate()).toThrowError('Your password must contain at least 8 characters.');
  });

  it('Password is too long', () => {
    const user = new User({ ...validUserFields, password: 'x'.repeat(41) });

    expect(() => user.validate()).toThrowError('Your password must contain at mist 40 characters.');
  });

  it('Password does not contain a digit', () => {
    const user = new User({ ...validUserFields, password: 'xxxxxxxxx' });

    expect(() => user.validate()).toThrowError('Your password must contain at least one digit.');
  });

  it('Password does not contain a lowercase letter', () => {
    const user = new User({ ...validUserFields, password: 'XXXXXXXX1' });

    expect(() => user.validate()).toThrowError('Your password must contain at least one lowercase letter.');
  });

  it('Password does not contain a uppercase letter', () => {
    const user = new User({ ...validUserFields, password: 'xxxxxxxx1' });

    expect(() => user.validate()).toThrowError('Your password must contain at least one uppercase letter.');
  });

  it('Age is invalid', () => {
    const user = new User({ ...validUserFields, age: 12 });

    expect(() => user.validate()).toThrowError('You must be at least 13 years old.');
  });

  it('User has more than one list', () => {
    const user = new User(validUserFields);

    user.addList(new List());

    expect(() => user.addList(new List())).toThrowError('You can only have one list.');
  });
});
