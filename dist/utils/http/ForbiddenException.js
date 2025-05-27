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

// src/utils/http/ForbiddenException.ts
var ForbiddenException_exports = {};
__export(ForbiddenException_exports, {
  ForbiddenException: () => ForbiddenException
});
module.exports = __toCommonJS(ForbiddenException_exports);

// src/utils/http/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
};

// src/utils/http/ForbiddenException.ts
var ForbiddenException = class extends HttpException {
  constructor(message, error) {
    super(403, message, error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ForbiddenException
});
