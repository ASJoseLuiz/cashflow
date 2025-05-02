import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Erro de validação",
        errors: result.error.format(),
      });
      return;
    }

    // Substitui o body com os dados validados
    req.body = result.data;
    next(); // Continua para o próximo middleware/controller
  };
}
