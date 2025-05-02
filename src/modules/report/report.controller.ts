import { NextFunction, Request, Response } from "express";
import { ReportService } from "./report.service";

export class ReportController {
  private readonly reportService: ReportService;
  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }
  public async generateReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.sub;
    const { tipo, mes, ano } = req.query;

    try {
      if (!userId || !ano) {
        res.status(400).json({ message: "Parâmetros inválidos" });
      }

      if (tipo === "mensal") {
        const report = await this.reportService.generateMonthlyReport(
          userId,
          Number(mes),
          Number(ano)
        );
        res.json(report);
      }

      if (tipo === "anual") {
        const report = await this.reportService.generateAnnualReport(
          userId,
          Number(ano)
        );
        res.json(report);
      }

      res.status(400).json({ message: "Tipo de relatório inválido" });
    } catch (error) {
      next(error);
    }
  }
}
