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

// src/modules/expense/expense.service.ts
var expense_service_exports = {};
__export(expense_service_exports, {
  ExpenseService: () => ExpenseService
});
module.exports = __toCommonJS(expense_service_exports);

// src/mongo/schemas/expense.schema.ts
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var expenseSchema = new import_mongoose.default.Schema({
  key: {
    type: String,
    required: true,
    default: import_uuid.v4,
    unique: true
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose.now)() },
    category: { type: String, required: true },
    description: { type: String, required: false }
  }
});
var expense_schema_default = import_mongoose.default.model("ExpenseModel", expenseSchema);

// src/entities/expense.ts
var Expense = class {
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

// src/utils/http/BadRequestException.ts
var BadRequestException = class extends HttpException {
  constructor(message, error) {
    super(400, message, error);
  }
};

// src/modules/expense/expense.service.ts
function toExpense(doc) {
  if (!(doc == null ? void 0 : doc.value))
    throw new BadRequestException("Documento inv\xE1lido ou incompleto.");
  return new Expense(doc._id.toString(), __spreadValues({}, doc.value));
}
var ExpenseService = class {
  getAllExpenses() {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find();
      return despesas.map(toExpense);
    });
  }
  getExpensesByUserId(userId) {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find({ "value.userId": userId });
      if (!despesas.length)
        throw new NotFoundException("Nenhuma despesa encontrada para o usu\xE1rio");
      return despesas.map(toExpense);
    });
  }
  saveExpense(userId, valor, category, description) {
    return __async(this, null, function* () {
      yield expense_schema_default.create({
        value: {
          userId,
          valor,
          category,
          description
        }
      });
    });
  }
  deleteAllExpenses(userId) {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find({ "value.userId": userId });
      if (!despesas.length)
        throw new NotFoundException("Nenhuma despesa encontrada para o usu\xE1rio");
      yield expense_schema_default.deleteMany({ "value.userId": userId });
    });
  }
  deleteExpenseById(userId, expenseId) {
    return __async(this, null, function* () {
      const despesa = yield expense_schema_default.findOne({
        _id: expenseId,
        "value.userId": userId
      });
      if (!despesa)
        throw new NotFoundException(
          `Despesa n\xE3o encontrada para o usu\xE1rio de id ${userId}`
        );
      yield expense_schema_default.deleteOne({ _id: expenseId });
    });
  }
  updateExpenseCategory(userId, expenseId, newCategory) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.category": newCategory } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
  updateExpenseDescription(userId, expenseId, newDescription) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.description": newDescription } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
  updateExpenseValue(userId, expenseId, newValue) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.valor": newValue } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpenseService
});
