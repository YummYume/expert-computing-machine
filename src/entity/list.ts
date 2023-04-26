import { z } from "zod";

import Item, { itemSchema } from './item';
import User from "./user";
import sendMail from "../service/mail-sender";

const listSchema = z.object({
  items: itemSchema.array().max(10, { message: 'A list can contain up to 10 items.' }).refine((val) => {
    const names: string[] = [];

    for (const item of val) {
      if (names.includes(item.name)) {
        return false;
      }

      names.push(item.name);
    }

    return true;
  }, { message: 'Item names must be unique.' }).default([]),
  lastAddedAt: z.date().optional().refine((val) => {
    if (!val) {
      return true;
    }

    const interval = new Date().getTime() - val.getTime();

    return (1000 * 60) * 30 <= interval;
  }, { message: 'You must wait at least 30 minutes before adding a new item.' }),
});

type ListSchema = z.infer<typeof listSchema>;

export { listSchema, type ListSchema };

export default class List {
  private items: Item[] = [];

  public lastAddedAt?: Date;

  constructor(items: Item[] = []) {
    this.items = items;
    this.validate();
  }

  addItem(item: Item, user?: User) {
    this.items.push(item);

    try {
      this.validate();

      if (user) {
        user.validate();
      }
    } catch (e) {
      this.items.pop();

      throw e;
    }

    this.lastAddedAt = new Date();

    if (this.items.length === 8 && user) {
      return sendMail(user);
    }
  }

  getItems() {
    return this.items;
  }

  validate() {
    return listSchema.parse(this);
  }
}
