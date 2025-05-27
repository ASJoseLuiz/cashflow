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

// src/modules/income/income.controller.ts
var income_controller_exports = {};
__export(income_controller_exports, {
  IncomeController: () => IncomeController
});
module.exports = __toCommonJS(income_controller_exports);
var IncomeController = class {
  constructor(incomeService) {
    this.incomeService = incomeService;
  }
  getAllIncomes(_req, res, next) {
    return __async(this, null, function* () {
      try {
        const receitas = yield this.incomeService.getAllIncomes();
        res.status(200).json(receitas);
      } catch (error) {
        next(error);
      }
    });
  }
  getIncomeByUserId(req, res, next) {
    return __async(this, null, function* () {
      const { userId } = req.params;
      try {
        const receita = yield this.incomeService.getIncomeByUserId(userId);
        res.status(200).json(receita);
      } catch (error) {
        next(error);
      }
    });
  }
  saveIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { value, category, description } = req.body;
      try {
        yield this.incomeService.saveIncome(userId, value, category, description);
        res.status(200).json(`Receita criada com sucesso`);
      } catch (error) {
        next(error);
      }
    });
  }
  deleteAllIncomes(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        yield this.incomeService.deleteAllIncomes(userId);
        res.status(200).json("Receitas deletadas");
      } catch (error) {
        next(error);
      }
    });
  }
  deleteIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { incomeId } = req.params;
      try {
        yield this.incomeService.deleteIncomeById(userId, incomeId);
        res.status(200).json("Receita deletada");
      } catch (error) {
        next(error);
      }
    });
  }
  updateIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { incomeId } = req.params;
      const { value, description, category } = req.body;
      try {
        if (value) {
          yield this.incomeService.updateIncomeValue(userId, incomeId, value);
        }
        if (description) {
          yield this.incomeService.updateIncomeDescription(
            userId,
            incomeId,
            description
          );
        }
        if (category) {
          yield this.incomeService.updateIncomeCategory(
            userId,
            incomeId,
            category
          );
        }
        res.status(200).json({ message: "Receita atualizada com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IncomeController
});
