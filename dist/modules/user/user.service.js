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

// src/modules/user/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(user_service_exports);
var import_bcrypt = require("bcrypt");

// src/entities/user.ts
var User = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};

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

// src/utils/http/ForbiddenException.ts
var ForbiddenException = class extends HttpException {
  constructor(message, error) {
    super(403, message, error);
  }
};

// src/modules/user/user.service.ts
function toUser(doc) {
  if (!(doc == null ? void 0 : doc.value))
    throw new HttpException(400, "Documento inv\xE1lido ou incompleto.");
  return new User(doc.key, __spreadValues({}, doc.value));
}
var UserService = class {
  getUserByEmail(email) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.findOne({ "value.email": email });
      if (!user)
        throw new NotFoundException(`Usu\xE1rio de email ${email} n\xE3o encontrado`);
      return toUser(user);
    });
  }
  getAllUsers() {
    return __async(this, null, function* () {
      const users = yield user_schema_default.find();
      return users.map(
        (doc) => new User(doc.key, {
          name: doc.value.name,
          email: doc.value.email,
          password: doc.value.password
        })
      );
    });
  }
  saveUser(name, email, password, confirmPassword) {
    return __async(this, null, function* () {
      const exists = yield user_schema_default.findOne({ "value.email": email });
      if (exists)
        throw new BadRequestException(`Usu\xE1rio de email ${email} j\xE1 existe`);
      if (password != confirmPassword)
        throw new ForbiddenException("Senha incorreta");
      const hashedPassword = yield (0, import_bcrypt.hash)(password, 10);
      yield user_schema_default.create({
        value: { name, email, password: hashedPassword }
      });
    });
  }
  deleteUser(email) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.findOne({ "value.email": email });
      if (!user) throw new NotFoundException("Usu\xE1rio n\xE3o existe");
      if (!user.value)
        throw new HttpException(406, "Documento inv\xE1lido ou incompleto.");
      yield user_schema_default.deleteOne({ "value.email": email });
    });
  }
  updateUserEmail(key, newEmail) {
    return __async(this, null, function* () {
      yield user_schema_default.findOneAndUpdate(
        { key },
        { $set: { "value.email": newEmail } }
      );
    });
  }
  updateUserName(key, newName) {
    return __async(this, null, function* () {
      yield user_schema_default.findOneAndUpdate(
        { key },
        { $set: { "value.name": newName } }
      );
    });
  }
  updateUserPassword(key, newPassword) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.findOne({ key });
      if (!user) {
        throw new NotFoundException("Usu\xE1rio n\xE3o encontrado");
      }
      if (!user.value) {
        throw new HttpException(406, "Documento inv\xE1lido ou incompleto.");
      }
      const hashedPassword = yield (0, import_bcrypt.hash)(newPassword, 10);
      yield user_schema_default.updateOne(
        { key },
        { $set: { "value.password": hashedPassword } }
      );
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
