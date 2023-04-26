import { z } from "zod";

import List, { listSchema } from "./list";

const userSchema = z.object({
  firstname: z.string().nonempty({ message: 'Please enter a firstname.' }),
  lastname: z.string().nonempty({ message: 'Please enter a lastname.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string()
    .min(8, { message: 'Your password must contain at least 8 characters.' })
    .max(40, { message: 'Your password must contain at mist 40 characters.' })
    .regex(/(?=.*[a-z])/, { message: 'Your password must contain at least one lowercase letter.' })
    .regex(/(?=.*[A-Z])/, { message: 'Your password must contain at least one uppercase letter.' })
    .regex(/(?=.*\d)/, { message: 'Your password must contain at least one digit.' }),
  age: z.number().min(13, { message: 'You must be at least 13 years old.' }),
  lists: listSchema.array().max(1, { message: 'You can only have one list.' }).default([]),
});

type UserSchema = z.infer<typeof userSchema>;

export { userSchema, type UserSchema };

export default class User {
  public firstname: string;

  public lastname: string;

  public email: string;

  public password: string;

  public age: number;

  private lists: List[] = [];

  constructor({ firstname, lastname, email, password, age }: UserSchema) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.age = age;
  }

  addList(list: List) {
    this.lists.push(list);

    try {
      this.validate();
    } catch(e) {
      this.lists.pop();

      throw e;
    }
  }

  getLists() {
    return this.lists;
  }

  validate() {
    return userSchema.parse(this);
  }

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
