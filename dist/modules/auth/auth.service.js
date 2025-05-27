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

// src/modules/auth/auth.service.ts
var auth_service_exports = {};
__export(auth_service_exports, {
  AuthService: () => AuthService
});
module.exports = __toCommonJS(auth_service_exports);
var import_bcrypt = require("bcrypt");

// src/mongo/schemas/user.schema.ts
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var userSchema = new import_mongoose.default.Schema({
  key: {
    type: String,
    required: true,
    default: import_uuid.v4,
    unique: true
  },
  value: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
});
var user_schema_default = import_mongoose.default.model("UserModel", userSchema);

// src/modules/auth/auth.service.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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

// src/utils/http/ForbiddenException.ts
var ForbiddenException = class extends HttpException {
  constructor(message, error) {
    super(403, message, error);
  }
};

// src/modules/auth/auth.service.ts
var AuthService = class {
  login(email, password) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.findOne({ "value.email": email });
      if (!user) {
        throw new NotFoundException(`Usu\xE1rio de email ${email} n\xE3o encontrado`);
      }
      if (!user.value) {
        throw new HttpException(401, "documento inv\xE1lido");
      }
      const passwordIsValid = (0, import_bcrypt.compareSync)(password, user.value.password);
      if (!passwordIsValid) {
        throw new ForbiddenException("N\xE3o autorizado. Senha ou email inv\xE1lidos.");
      }
      const payload = { sub: user.key, email: user.value.email };
      const token = import_jsonwebtoken.default.sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: "1h"
      });
      return token;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthService
});
