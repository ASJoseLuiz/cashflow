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
    const userId = req.user?.sub;
    const { tipo, mes, ano, semestre } = req.query;

    if (!userId || !ano || typeof tipo !== "string") {
      res.status(400).json({ message: "Parâmetros inválidos" });
    }

    try {
      const anoNum = Number(ano);
      let report;

      switch (tipo) {
        case "mensal":
          if (!mes) {
            res.status(400).json({ message: "Mês é obrigatório para relatório mensal" });
          }
          report = await this.reportService.generateMonthlyReport(
            userId,
            Number(mes),
            anoNum
          );
          break;

        case "anual":
          report = await this.reportService.generateAnnualReport(userId, anoNum);
          break;

        case "semestral":
          if (!semestre || !["1", "2"].includes(semestre.toString())) {
            res.status(400).json({ message: "Semestre inválido (use 1 ou 2)" });
          }
          report = await this.reportService.generateSemiAnnualReport(
            userId,
            Number(semestre) as 1 | 2,
            anoNum
          );
          break;

        default:
          res.status(400).json({ message: "Tipo de relatório inválido" });
      }

      res.json(report);
    } catch (error) {
      next(error);
    }
  }
}