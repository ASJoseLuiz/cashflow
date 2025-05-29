import expenseModel from "../../mongo/schemas/expense.schema";
import incomeModel from "../../mongo/schemas/income.schema";

export class ReportService {
  private async getReportData(userId: string, start: Date, end: Date) {
    const [despesas, receitas] = await Promise.all([
      expenseModel.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end },
      }),
      incomeModel.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end },
      }),
    ]);

    const totalDespesas = despesas.reduce((acc, d) => acc + (d.value?.valor || 0), 0);
    const totalReceitas = receitas.reduce((acc, r) => acc + (r.value?.valor || 0), 0);
    const saldo = totalReceitas - totalDespesas;

    return {
      despesas,
      receitas,
      totalDespesas: parseFloat(totalDespesas.toFixed(2)),
      totalReceitas: parseFloat(totalReceitas.toFixed(2)),
      saldo: parseFloat(saldo.toFixed(2)),
    };
  }

  public async generateMonthlyReport(userId: string, month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const data = await this.getReportData(userId, start, end);

    return {
      mes: month,
      ano: year,
      ...data,
    };
  }

  public async generateSemiAnnualReport(userId: string, semester: 1 | 2, year: number) {
    const startMonth = semester === 1 ? 0 : 6;
    const endMonth = semester === 1 ? 6 : 12;

    const start = new Date(year, startMonth, 1);
    const end = new Date(year, endMonth, 1);
    const data = await this.getReportData(userId, start, end);

    return {
      semestre: semester,
      ano: year,
      ...data,
    };
  }

  public async generateAnnualReport(userId: string, year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);
    const data = await this.getReportData(userId, start, end);

    return {
      ano: year,
      ...data,
    };
  }
}
