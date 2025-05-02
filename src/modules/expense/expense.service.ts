import despesaModel from "../../mongo/schemas/expense.schema";
import { Expense } from "../../entities/expense";
import { NotFoundException } from "../../utils/http/NotFoundException";
import { BadRequestException } from "../../utils/http/BadRequestException";

function toExpense(doc: any): Expense {
  if (!doc?.value)
    throw new BadRequestException("Documento inválido ou incompleto.");
  return new Expense(doc._id.toString(), { ...doc.value });
}

export class ExpenseService {
  public async getAllExpenses(): Promise<Expense[]> {
    const despesas = await despesaModel.find();
    return despesas.map(toExpense);
  }

  public async getExpensesByUserId(userId: string): Promise<Expense[]> {
    const despesas = await despesaModel.find({ "value.userId": userId });
    if (!despesas.length)
      throw new NotFoundException("Nenhuma despesa encontrada para o usuário");

    return despesas.map(toExpense);
  }

  public async saveExpense(
    userId: string,
    valor: number,
    category: string,
    description: string
  ): Promise<void> {
    await despesaModel.create({
      value: {
        userId,
        valor,
        category,
        description,
      },
    });
  }

  public async deleteAllExpenses(userId: string): Promise<void> {
    const despesas = await despesaModel.find({ "value.userId": userId });
    if (!despesas.length)
      throw new NotFoundException("Nenhuma despesa encontrada para o usuário");

    await despesaModel.deleteMany({ "value.userId": userId });
  }

  public async deleteExpenseById(
    userId: string,
    expenseId: string
  ): Promise<void> {
    const despesa = await despesaModel.findOne({
      _id: expenseId,
      "value.userId": userId,
    });
    if (!despesa)
      throw new NotFoundException(
        `Despesa não encontrada para o usuário de id ${userId}`
      );

    await despesaModel.deleteOne({ _id: expenseId });
  }

  public async updateExpenseCategory(
    userId: string,
    expenseId: string,
    newCategory: string
  ): Promise<void> {
    const result = await despesaModel.findOneAndUpdate(
      { _id: expenseId, "value.userId": userId },
      { $set: { "value.category": newCategory } }
    );

    if (!result) throw new NotFoundException("Despesa não encontrada");
  }

  public async updateExpenseDescription(
    userId: string,
    expenseId: string,
    newDescription: string
  ): Promise<void> {
    const result = await despesaModel.findOneAndUpdate(
      { _id: expenseId, "value.userId": userId },
      { $set: { "value.description": newDescription } }
    );

    if (!result) throw new NotFoundException("Despesa não encontrada");
  }

  public async updateExpenseValue(
    userId: string,
    expenseId: string,
    newValue: number
  ): Promise<void> {
    const result = await despesaModel.findOneAndUpdate(
      { _id: expenseId, "value.userId": userId },
      { $set: { "value.valor": newValue } }
    );

    if (!result) throw new NotFoundException("Despesa não encontrada");
  }
}
