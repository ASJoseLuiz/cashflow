"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/modules/expense/expense.controller.ts
var expense_controller_exports = {};
__export(expense_controller_exports, {
  ExpenseController: () => ExpenseController
});
module.exports = __toCommonJS(expense_controller_exports);
var ExpenseController = class {
  constructor(expenseService) {
    this.expenseService = expenseService;
  }
  getAllExpenses(_req, res, next) {
    return __async(this, null, function* () {
      try {
        const despesas = yield this.expenseService.getAllExpenses();
        res.status(200).json(despesas);
      } catch (error) {
        next(error);
      }
    });
  }
  getExpensesByUserId(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        const despesas = yield this.expenseService.getExpensesByUserId(userId);
        res.status(200).json(despesas);
      } catch (error) {
        next(error);
      }
    });
  }
  saveExpense(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { value, category, description } = req.body;
      try {
        yield this.expenseService.saveExpense(
          userId,
          value,
          category,
          description
        );
        res.status(200).json("Despesa criada com sucesso");
      } catch (error) {
        next(error);
      }
    });
  }
  updateExpense(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { expenseId } = req.params;
      const { value, description, category } = req.body;
      try {
        if (value) {
          yield this.expenseService.updateExpenseValue(userId, expenseId, value);
        }
        if (description) {
          yield this.expenseService.updateExpenseDescription(
            userId,
            expenseId,
            description
          );
        }
        if (category) {
          yield this.expenseService.updateExpenseCategory(
            userId,
            expenseId,
            category
          );
        }
        res.status(200).json({ message: "Despesa atualizada com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
  deleteExpenseById(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { expenseId } = req.params;
      try {
        yield this.expenseService.deleteExpenseById(userId, expenseId);
        res.status(200).json("Despesa deletada");
      } catch (error) {
        next(error);
      }
    });
  }
  deleteAllExpenses(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        yield this.expenseService.deleteAllExpenses(userId);
        res.status(200).json("Todas as despesas foram removidas com sucesso.");
      } catch (error) {
        next(error);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpenseController
});
