import { z } from "zod";

export const createExpenseSchema = z.object({
  value: z.number().positive("Valor deve ser positivo"),
  description: z.string().optional(),
  category: z.enum([
    "supermercado",
    "educacao",
    "beleza",
    "saúde",
    "transporte",
    "outros",
  ]),
});

export const updateExpenseSchema = z.object({
  value: z.number().positive("Valor deve ser positivo").optional(),
  description: z.string().optional(),
  category: z
    .enum([
      "supermercado",
      "educacao",
      "beleza",
      "saúde",
      "transporte",
      "outros",
    ])
    .optional(),
});
