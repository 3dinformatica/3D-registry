import { z } from "zod";

export const PersistableEntitySchema = z.object({
    id: z.uuid().nullish(),
    disabledAt: z.date().nullish(),
    createdAt: z.date().nullish(),
    updatedAt: z.date().nullish(),
  });

export type PersistableEntity = z.infer<typeof PersistableEntitySchema>;

