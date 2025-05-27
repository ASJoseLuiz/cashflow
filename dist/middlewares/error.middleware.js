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

// src/middlewares/error.middleware.ts
var error_middleware_exports = {};
__export(error_middleware_exports, {
  errorMiddleware: () => errorMiddleware
});
module.exports = __toCommonJS(error_middleware_exports);

// src/utils/http/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
};

// src/middlewares/error.middleware.ts
function errorMiddleware(error, req, res, _next) {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || "Erro interno do servidor";
  res.status(status).json({ status, message });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorMiddleware
});
