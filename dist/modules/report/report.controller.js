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

// src/modules/report/report.controller.ts
var report_controller_exports = {};
__export(report_controller_exports, {
  ReportController: () => ReportController
});
module.exports = __toCommonJS(report_controller_exports);
var ReportController = class {
  constructor(reportService) {
    this.reportService = reportService;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReportController
});
