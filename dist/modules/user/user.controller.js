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

// src/modules/user/user.controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(user_controller_exports);

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
  constructor(userService) {
    this.userService = userService;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
