import { z } from "zod";

const itemSchema = z.object({
  name: z.string().nonempty({ message: 'Please enter a name.' }),
  content: z.string().max(1000, { message: 'Content must contain up to 1000 characters.' }).optional(),
  createdAt: z.date(),
});

type ItemSchema = z.infer<typeof itemSchema>;

type BaseItemSchema = Omit<ItemSchema, 'createdAt'>;

export { itemSchema, type ItemSchema, type BaseItemSchema };

export default class Item {
  public name: string;

  public content?: string;

  public createdAt: Date;

  constructor({ name, content }: BaseItemSchema) {
    this.name = name;
    this.content = content;
    this.createdAt = new Date();
  }

  validate() {
    return itemSchema.parse(this);
  }
}
