"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/modules/income/income.module.ts
var income_module_exports = {};
__export(income_module_exports, {
  incomeController: () => incomeController
});
module.exports = __toCommonJS(income_module_exports);

// src/modules/income/income.controller.ts
var IncomeController = class {
  constructor(incomeService2) {
    this.incomeService = incomeService2;
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

// src/mongo/schemas/income.schema.ts
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var incomeSchema = new import_mongoose.default.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: import_uuid.v4
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose.now)() },
    description: { type: String, required: false }
  }
});
var income_schema_default = import_mongoose.default.model("IncomeModel", incomeSchema);

// src/entities/income.ts
var Income = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};

// src/utils/http/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
};

// src/utils/http/NotFoundException.ts
var NotFoundException = class extends HttpException {
  constructor(message, error) {
    super(404, message, error);
  }
};

// src/modules/income/income.service.ts
function toIncome(doc) {
  if (!(doc == null ? void 0 : doc.value)) throw new Error("Documento inv\xE1lido ou incompleto.");
  return new Income(doc.key, __spreadValues({}, doc.value));
}
var IncomeService = class {
  getAllIncomes() {
    return __async(this, null, function* () {
      const receitas = yield income_schema_default.find();
      return receitas.map(toIncome);
    });
  }
  getIncomeByUserId(userId) {
    return __async(this, null, function* () {
      const receita = yield income_schema_default.find({ "value.userId": userId });
      if (!receita)
        throw new NotFoundException("Receita n\xE3o encontrada para o usu\xE1rio");
      return receita.map(toIncome);
    });
  }
  saveIncome(userId, valor, category, description) {
    return __async(this, null, function* () {
      yield income_schema_default.create({
        value: { valor, userId, category, description }
      });
    });
  }
  deleteAllIncomes(userId) {
    return __async(this, null, function* () {
      const receitas = yield income_schema_default.find({ "value.userId": userId });
      if (!receitas.length)
        throw new NotFoundException("Nenhuma receita encontrada para o usu\xE1rio");
      yield income_schema_default.deleteMany({ "value.userId": userId });
    });
  }
  deleteIncomeById(userId, incomeId) {
    return __async(this, null, function* () {
      const receita = yield income_schema_default.findOne({
        key: incomeId,
        "value.userId": userId
      });
      if (!receita)
        throw new NotFoundException(
          `Receita n\xE3o encontrada para o usu\xE1rio de id ${userId}`
        );
      yield income_schema_default.deleteOne({ key: incomeId });
    });
  }
  updateIncomeValue(userId, incomeId, newValue) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.valor": newValue } }
      );
    });
  }
  updateIncomeCategory(userId, incomeId, newCategory) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.category": newCategory } }
      );
    });
  }
  updateIncomeDescription(userId, incomeId, newDescription) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.description": newDescription } }
      );
    });
  }
};

// src/modules/income/income.module.ts
var incomeService = new IncomeService();
var incomeController = new IncomeController(incomeService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  incomeController
});
