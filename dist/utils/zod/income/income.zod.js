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

// src/utils/zod/income/income.zod.ts
var income_zod_exports = {};
__export(income_zod_exports, {
  createIncomeSchema: () => createIncomeSchema,
  updateIncomeSchema: () => updateIncomeSchema
});
module.exports = __toCommonJS(income_zod_exports);
var import_zod = require("zod");
var createIncomeSchema = import_zod.z.object({
  value: import_zod.z.number().positive("Valor deve ser positivo"),
  description: import_zod.z.string().optional(),
  category: import_zod.z.enum(["salario", "investimento", "freelance", "outros"])
});
var updateIncomeSchema = import_zod.z.object({
  value: import_zod.z.number().positive("Valor deve ser positivo").optional(),
  description: import_zod.z.string().optional(),
  category: import_zod.z.enum(["salario", "investimento", "freelance", "outros"]).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createIncomeSchema,
  updateIncomeSchema
});
