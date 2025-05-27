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

// src/modules/user/user.router.ts
var user_router_exports = {};
__export(user_router_exports, {
  default: () => user_router_default
});
module.exports = __toCommonJS(user_router_exports);
var import_express = require("express");

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

// src/modules/user/user.controller.ts
var UserController = class {
  constructor(userService2) {
    this.userService = userService2;
  }
  createUser(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { name, email, password, confirmPassword } = req.body;
        yield this.userService.saveUser(name, email, password, confirmPassword);
        res.status(201).json({ message: "Usu\xE1rio criado com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
  getAllUsers(_req, res, next) {
    return __async(this, null, function* () {
      try {
        const users = yield this.userService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
    });
  }
  getUserByEmail(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { email } = req.params;
        const user = yield this.userService.getUserByEmail(email);
        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    });
  }
  deleteUser(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { email, password } = req.body;
        if (!req.user) {
          throw new ForbiddenException("Usu\xE1rio n\xE3o autenticado");
        }
        if (email !== req.user.email) {
          throw new ForbiddenException("Voc\xEA s\xF3 pode deletar sua pr\xF3pria conta");
        }
        yield this.userService.deleteUser(email, password);
        res.status(200).json({ message: "Usu\xE1rio deletado com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
  updateUser(req, res, next) {
    return __async(this, null, function* () {
      const { name, email, password } = req.body;
      if (!req.user) {
        throw new ForbiddenException("Usu\xE1rio n\xE3o autenticado");
      }
      try {
        if (email) {
          yield this.userService.updateUserEmail(req.user.sub, email);
        }
        if (name) {
          yield this.userService.updateUserName(req.user.sub, name);
        }
        if (password) {
          yield this.userService.updateUserPassword(req.user.sub, password);
        }
        res.status(200).json({ message: "Usu\xE1rio atualizado com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/modules/user/user.service.ts
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
  deleteUser(email, password) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.findOne({ "value.email": email });
      if (!user) throw new NotFoundException("Usu\xE1rio n\xE3o existe");
      if (!user.value)
        throw new HttpException(406, "Documento inv\xE1lido ou incompleto.");
      const isValid = (0, import_bcrypt.compareSync)(password, user.value.password);
      if (!isValid) throw new ForbiddenException("Usu\xE1rio n\xE3o autorizado");
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

// src/modules/user/user.module.ts
var userService = new UserService();
var userController = new UserController(userService);

// src/middlewares/auth.middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token n\xE3o fornecido ou mal formatado" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = import_jsonwebtoken.default.verify(token, String(process.env.JWT_SECRET));
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

// src/middlewares/validateBody.middleware.ts
function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Erro de valida\xE7\xE3o",
        errors: result.error.format()
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

// src/utils/zod/user/user.zod.ts
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

// src/modules/user/user.router.ts
var userRouter = (0, import_express.Router)();
userRouter.get(
  "/",
  (req, res, next) => userController.getAllUsers(req, res, next)
);
userRouter.get(
  "/:email",
  (req, res, next) => userController.getUserByEmail(req, res, next)
);
userRouter.post(
  "/",
  validateBody(createUserSchema),
  (req, res, next) => userController.createUser(req, res, next)
);
userRouter.delete(
  "/",
  authMiddleware,
  validateBody(authUserSchema),
  (req, res, next) => userController.deleteUser(req, res, next)
);
userRouter.put(
  "/",
  authMiddleware,
  validateBody(updateUserSchema),
  (req, res, next) => userController.updateUser(req, res, next)
);
var user_router_default = userRouter;
