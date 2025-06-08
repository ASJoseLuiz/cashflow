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

// src/modules/report/report.module.ts
var report_module_exports = {};
__export(report_module_exports, {
  reportController: () => reportController
});
module.exports = __toCommonJS(report_module_exports);

// src/modules/report/report.controller.ts
var ReportController = class {
  constructor(reportService2) {
    this.reportService = reportService2;
  }
  generateReport(req, res, next) {
    return __async(this, null, function* () {
      var _a;
      const userId = (_a = req.user) == null ? void 0 : _a.sub;
      const { tipo, mes, ano, semestre } = req.query;
      if (!userId || !ano || typeof tipo !== "string") {
        res.status(400).json({ message: "Par\xE2metros inv\xE1lidos" });
      }
      try {
        const anoNum = Number(ano);
        let report;
        switch (tipo) {
          case "mensal":
            if (!mes) {
              res.status(400).json({ message: "M\xEAs \xE9 obrigat\xF3rio para relat\xF3rio mensal" });
            }
            report = yield this.reportService.generateMonthlyReport(
              userId,
              Number(mes),
              anoNum
            );
            break;
          case "anual":
            report = yield this.reportService.generateAnnualReport(userId, anoNum);
            break;
          case "semestral":
            if (!semestre || !["1", "2"].includes(semestre.toString())) {
              res.status(400).json({ message: "Semestre inv\xE1lido (use 1 ou 2)" });
            }
            report = yield this.reportService.generateSemiAnnualReport(
              userId,
              Number(semestre),
              anoNum
            );
            break;
          default:
            res.status(400).json({ message: "Tipo de relat\xF3rio inv\xE1lido" });
        }
        res.json(report);
      } catch (error) {
        next(error);
      }
    });
  }
};

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
  getReportData(userId, start, end) {
    return __async(this, null, function* () {
      const [despesas, receitas] = yield Promise.all([
        expense_schema_default.find({
          "value.userId": userId,
          "value.date": { $gte: start, $lt: end }
        }),
        income_schema_default.find({
          "value.userId": userId,
          "value.date": { $gte: start, $lt: end }
        })
      ]);
      const totalDespesas = despesas.reduce((acc, d) => {
        var _a;
        return acc + (((_a = d.value) == null ? void 0 : _a.valor) || 0);
      }, 0);
      const totalReceitas = receitas.reduce((acc, r) => {
        var _a;
        return acc + (((_a = r.value) == null ? void 0 : _a.valor) || 0);
      }, 0);
      const saldo = totalReceitas - totalDespesas;
      return {
        despesas,
        receitas,
        totalDespesas: parseFloat(totalDespesas.toFixed(2)),
        totalReceitas: parseFloat(totalReceitas.toFixed(2)),
        saldo: parseFloat(saldo.toFixed(2))
      };
    });
  }
  generateMonthlyReport(userId, month, year) {
    return __async(this, null, function* () {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      const data = yield this.getReportData(userId, start, end);
      return __spreadValues({
        mes: month,
        ano: year
      }, data);
    });
  }
  generateSemiAnnualReport(userId, semester, year) {
    return __async(this, null, function* () {
      const startMonth = semester === 1 ? 0 : 6;
      const endMonth = semester === 1 ? 6 : 12;
      const start = new Date(year, startMonth, 1);
      const end = new Date(year, endMonth, 1);
      const data = yield this.getReportData(userId, start, end);
      return __spreadValues({
        semestre: semester,
        ano: year
      }, data);
    });
  }
  generateAnnualReport(userId, year) {
    return __async(this, null, function* () {
      const start = new Date(year, 0, 1);
      const end = new Date(year + 1, 0, 1);
      const data = yield this.getReportData(userId, start, end);
      return __spreadValues({
        ano: year
      }, data);
    });
  }
};

// src/modules/report/report.module.ts
var reportService = new ReportService();
var reportController = new ReportController(reportService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reportController
});
