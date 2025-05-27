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

// src/utils/zod/user/user.zod.ts
var user_zod_exports = {};
__export(user_zod_exports, {
  authUserSchema: () => authUserSchema,
  createUserSchema: () => createUserSchema,
  updateUserSchema: () => updateUserSchema
});
module.exports = __toCommonJS(user_zod_exports);
var import_zod = require("zod");
var createUserSchema = import_zod.z.object({
  name: import_zod.z.string().min(1, "Nome \xE9 obrigat\xF3rio"),
  email: import_zod.z.string().email("Email inv\xE1lido"),
  password: import_zod.z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres"),
  confirmPassword: import_zod.z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres")
});
var authUserSchema = import_zod.z.object({
  email: import_zod.z.string().email("Email inv\xE1lido"),
  password: import_zod.z.string().min(1, "Senha \xE9 obrigat\xF3ria")
});
var updateUserSchema = import_zod.z.object({
  name: import_zod.z.string().optional(),
  email: import_zod.z.string().email("E-mail inv\xE1lido").optional(),
  password: import_zod.z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authUserSchema,
  createUserSchema,
  updateUserSchema
});
