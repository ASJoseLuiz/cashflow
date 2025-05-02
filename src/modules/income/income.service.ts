import incomeModel from "../../mongo/schemas/income.schema";
import { Income } from "../../entities/income";
import { NotFoundException } from "../../utils/http/NotFoundException";

function toIncome(doc: any): Income {
  if (!doc?.value) throw new Error("Documento inválido ou incompleto.");
  return new Income(doc.key, { ...doc.value });
}

export class IncomeService {
  public async getAllIncomes(): Promise<Income[]> {
    const receitas = await incomeModel.find();
    return receitas.map(toIncome);
  }
  public async getIncomeByUserId(userId: string): Promise<Income[]> {
    const receita = await incomeModel.find({ "value.userId": userId });
    if (!receita)
      throw new NotFoundException("Receita não encontrada para o usuário");
    return receita.map(toIncome);
  }

  public async saveIncome(
    userId: string,
    valor: number,
    category: string,
    description: string
  ): Promise<void> {
    await incomeModel.create({
      value: { valor, userId, category, description },
    });
  }

  public async deleteAllIncomes(userId: string): Promise<void> {
    const receitas = await incomeModel.find({ "value.userId": userId });
    if (!receitas.length)
      throw new NotFoundException("Nenhuma receita encontrada para o usuário");

    await incomeModel.deleteMany({ "value.userId": userId });
  }

  public async deleteIncomeById(
    userId: string,
    incomeId: string
  ): Promise<void> {
    const receita = await incomeModel.findOne({
      key: incomeId,
      "value.userId": userId,
    });
    if (!receita)
      throw new NotFoundException(
        `Receita não encontrada para o usuário de id ${userId}`
      );

    await incomeModel.deleteOne({ key: incomeId });
  }

  public async updateIncomeValue(
    userId: string,
    incomeId: string,
    newValue: number
  ): Promise<void> {
    await incomeModel.findOneAndUpdate(
      { key: incomeId, "value.userId": userId },
      { $set: { "value.valor": newValue } }
    );
  }

  public async updateIncomeCategory(
    userId: string,
    incomeId: string,
    newCategory: string
  ): Promise<void> {
    await incomeModel.findOneAndUpdate(
      { key: incomeId, "value.userId": userId },
      { $set: { "value.category": newCategory } }
    );
  }

  public async updateIncomeDescription(
    userId: string,
    incomeId: string,
    newDescription: string
  ): Promise<void> {
    await incomeModel.findOneAndUpdate(
      { key: incomeId, "value.userId": userId },
      { $set: { "value.description": newDescription } }
    );
  }
}
