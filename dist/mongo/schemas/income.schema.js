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

// src/mongo/schemas/income.schema.ts
var income_schema_exports = {};
__export(income_schema_exports, {
  default: () => income_schema_default
});
module.exports = __toCommonJS(income_schema_exports);
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
