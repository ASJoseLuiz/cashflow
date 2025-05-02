import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

const expenseService = new ExpenseService();
const expenseController = new ExpenseController(expenseService);

export { expenseController };
