"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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

// src/modules/report/report.service.ts
var report_service_exports = {};
__export(report_service_exports, {
  ReportService: () => ReportService
});
module.exports = __toCommonJS(report_service_exports);

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

// src/mongo/schemas/income.schema.ts
var import_mongoose2 = __toESM(require("mongoose"));
var import_uuid2 = require("uuid");
var incomeSchema = new import_mongoose2.default.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: import_uuid2.v4
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose2.now)() },
    description: { type: String, required: false }
  }
});
var income_schema_default = import_mongoose2.default.model("IncomeModel", incomeSchema);

// src/modules/report/report.service.ts
var ReportService = class {
  generateMonthlyReport(userId, month, year) {
    return __async(this, null, function* () {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      const despesas = yield expense_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const receitas = yield income_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const totalDespesas = despesas.length ? despesas.reduce((acc, d) => acc + (d.value.valor || 0), 0) : 0;
      const totalReceitas = receitas.length ? receitas.reduce((acc, r) => acc + (r.value.valor || 0), 0) : 0;
      const saldo = totalReceitas - totalDespesas;
      return {
        mes: month,
        ano: year,
        despesas,
        receitas,
        totalDespesas: parseFloat(totalDespesas.toFixed(2)),
        totalReceitas: parseFloat(totalReceitas.toFixed(2)),
        saldo: parseFloat(saldo.toFixed(2))
      };
    });
  }
  generateAnnualReport(userId, year) {
    return __async(this, null, function* () {
      const start = new Date(year, 0, 1);
      const end = new Date(year + 1, 0, 1);
      const despesas = yield expense_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const receitas = yield income_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const totalDespesas = despesas.reduce(
        (acc, d) => {
          var _a;
          return acc + (((_a = d.value) == null ? void 0 : _a.valor) || 0);
        },
        0
      );
      const totalReceitas = receitas.reduce(
        (acc, r) => {
          var _a;
          return acc + (((_a = r.value) == null ? void 0 : _a.valor) || 0);
        },
        0
      );
      const saldo = totalReceitas - totalDespesas;
      return {
        ano: year,
        despesas,
        receitas,
        totalExpenses: parseFloat(totalDespesas.toFixed(2)),
        totalIncome: parseFloat(totalReceitas.toFixed(2)),
        balance: parseFloat(saldo.toFixed(2))
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReportService
});
