import { IncomeController } from "./income.controller";
import { IncomeService } from "./income.service";

const incomeService = new IncomeService();
const incomeController = new IncomeController(incomeService);

export { incomeController };
