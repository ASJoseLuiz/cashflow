import { z } from "zod";

export const createIncomeSchema = z.object({
  value: z.number().positive("Valor deve ser positivo"),
  description: z.string().optional(),
  category: z.enum(["salario", "investimento", "freelance", "outros"]),
});

export const updateIncomeSchema = z.object({
  value: z.number().positive("Valor deve ser positivo").optional(),
  description: z.string().optional(),
  category: z
    .enum(["salario", "investimento", "freelance", "outros"])
    .optional(),
});
