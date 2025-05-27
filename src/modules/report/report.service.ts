import expenseModel from "../../mongo/schemas/expense.schema";
import incomeModel from "../../mongo/schemas/income.schema";

export class ReportService {
  public async generateMonthlyReport(
    userId: string,
    month: number,
    year: number
  ) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const despesas = await expenseModel.find({
      "value.userId": userId,
      "value.date": { $gte: start, $lt: end },
    });

    const receitas = await incomeModel.find({
      "value.userId": userId,
      "value.date": { $gte: start, $lt: end },
    });

    const totalDespesas = despesas.length
      ? despesas.reduce((acc, d) => acc + (d.value!.valor || 0), 0)
      : 0;

    const totalReceitas = receitas.length
      ? receitas.reduce((acc, r) => acc + (r.value!.valor || 0), 0)
      : 0;

    const saldo = totalReceitas - totalDespesas;

    return {
      mes: month,
      ano: year,
      despesas,
      receitas,
      totalDespesas: parseFloat(totalDespesas.toFixed(2)),
      totalReceitas: parseFloat(totalReceitas.toFixed(2)),
      saldo: parseFloat(saldo.toFixed(2)),
    };
  }

  public async generateAnnualReport(userId: string, year: number) {
    const start = new Date(year, 0, 1); // Janeiro
    const end = new Date(year + 1, 0, 1); // Janeiro do ano seguinte

    const despesas = await expenseModel.find({
      "value.userId": userId,
      "value.date": { $gte: start, $lt: end },
    });

    const receitas = await incomeModel.find({
      "value.userId": userId,
      "value.date": { $gte: start, $lt: end },
    });

    const totalDespesas = despesas.reduce(
      (acc, d) => acc + (d.value?.valor || 0),
      0
    );

    const totalReceitas = receitas.reduce(
      (acc, r) => acc + (r.value?.valor || 0),
      0
    );

    const saldo = totalReceitas - totalDespesas;

    return {
      ano: year,
      despesas,
      receitas,
      totalExpenses: parseFloat(totalDespesas.toFixed(2)),
      totalIncome: parseFloat(totalReceitas.toFixed(2)),
      balance: parseFloat(saldo.toFixed(2)),
    };
  }
}
