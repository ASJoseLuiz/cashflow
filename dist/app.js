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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  App: () => App
});
module.exports = __toCommonJS(app_exports);
var import_express6 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/modules/user/user.router.ts
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

// src/modules/auth/auth.router.ts
var import_express2 = require("express");

// src/modules/auth/auth.controller.ts
var AuthController = class {
  constructor(authService2) {
    this.authService = authService2;
  }
  login(req, res, next) {
    return __async(this, null, function* () {
      const { email, password } = req.body;
      try {
        const token = yield this.authService.login(email, password);
        if (!token) {
          throw new ForbiddenException("Email ou senha inv\xE1lidos");
        }
        res.status(200).json({ token });
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/modules/auth/auth.service.ts
var import_bcrypt2 = require("bcrypt");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
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
      const passwordIsValid = (0, import_bcrypt2.compareSync)(password, user.value.password);
      if (!passwordIsValid) {
        throw new ForbiddenException("N\xE3o autorizado. Senha ou email inv\xE1lidos.");
      }
      const payload = { sub: user.key, email: user.value.email };
      const token = import_jsonwebtoken2.default.sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: "1h"
      });
      return token;
    });
  }
};

// src/modules/auth/auth.module.ts
var authService = new AuthService();
var authController = new AuthController(authService);

// src/modules/auth/auth.router.ts
var authRouter = (0, import_express2.Router)();
authRouter.post(
  "/",
  validateBody(authUserSchema),
  (req, res, next) => authController.login(req, res, next)
);
var auth_router_default = authRouter;

// src/modules/income/income.router.ts
var import_express3 = require("express");

// src/modules/income/income.controller.ts
var IncomeController = class {
  constructor(incomeService2) {
    this.incomeService = incomeService2;
  }
  getAllIncomes(_req, res, next) {
    return __async(this, null, function* () {
      try {
        const receitas = yield this.incomeService.getAllIncomes();
        res.status(200).json(receitas);
      } catch (error) {
        next(error);
      }
    });
  }
  getIncomeByUserId(req, res, next) {
    return __async(this, null, function* () {
      const { userId } = req.params;
      try {
        const receita = yield this.incomeService.getIncomeByUserId(userId);
        res.status(200).json(receita);
      } catch (error) {
        next(error);
      }
    });
  }
  saveIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { value, category, description } = req.body;
      try {
        yield this.incomeService.saveIncome(userId, value, category, description);
        res.status(200).json(`Receita criada com sucesso`);
      } catch (error) {
        next(error);
      }
    });
  }
  deleteAllIncomes(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        yield this.incomeService.deleteAllIncomes(userId);
        res.status(200).json("Receitas deletadas");
      } catch (error) {
        next(error);
      }
    });
  }
  deleteIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { incomeId } = req.params;
      try {
        yield this.incomeService.deleteIncomeById(userId, incomeId);
        res.status(200).json("Receita deletada");
      } catch (error) {
        next(error);
      }
    });
  }
  updateIncome(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { incomeId } = req.params;
      const { value, description, category } = req.body;
      try {
        if (value) {
          yield this.incomeService.updateIncomeValue(userId, incomeId, value);
        }
        if (description) {
          yield this.incomeService.updateIncomeDescription(
            userId,
            incomeId,
            description
          );
        }
        if (category) {
          yield this.incomeService.updateIncomeCategory(
            userId,
            incomeId,
            category
          );
        }
        res.status(200).json({ message: "Receita atualizada com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/mongo/schemas/income.schema.ts
var import_mongoose2 = __toESM(require("mongoose"));
var import_uuid2 = require("uuid");
var incomeSchema = new import_mongoose2.default.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: import_uuid2.v4
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose2.now)() },
    description: { type: String, required: false }
  }
});
var income_schema_default = import_mongoose2.default.model("IncomeModel", incomeSchema);

// src/entities/income.ts
var Income = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};

// src/modules/income/income.service.ts
function toIncome(doc) {
  if (!(doc == null ? void 0 : doc.value)) throw new Error("Documento inv\xE1lido ou incompleto.");
  return new Income(doc.key, __spreadValues({}, doc.value));
}
var IncomeService = class {
  getAllIncomes() {
    return __async(this, null, function* () {
      const receitas = yield income_schema_default.find();
      return receitas.map(toIncome);
    });
  }
  getIncomeByUserId(userId) {
    return __async(this, null, function* () {
      const receita = yield income_schema_default.find({ "value.userId": userId });
      if (!receita)
        throw new NotFoundException("Receita n\xE3o encontrada para o usu\xE1rio");
      return receita.map(toIncome);
    });
  }
  saveIncome(userId, valor, category, description) {
    return __async(this, null, function* () {
      yield income_schema_default.create({
        value: { valor, userId, category, description }
      });
    });
  }
  deleteAllIncomes(userId) {
    return __async(this, null, function* () {
      const receitas = yield income_schema_default.find({ "value.userId": userId });
      if (!receitas.length)
        throw new NotFoundException("Nenhuma receita encontrada para o usu\xE1rio");
      yield income_schema_default.deleteMany({ "value.userId": userId });
    });
  }
  deleteIncomeById(userId, incomeId) {
    return __async(this, null, function* () {
      const receita = yield income_schema_default.findOne({
        key: incomeId,
        "value.userId": userId
      });
      if (!receita)
        throw new NotFoundException(
          `Receita n\xE3o encontrada para o usu\xE1rio de id ${userId}`
        );
      yield income_schema_default.deleteOne({ key: incomeId });
    });
  }
  updateIncomeValue(userId, incomeId, newValue) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.valor": newValue } }
      );
    });
  }
  updateIncomeCategory(userId, incomeId, newCategory) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.category": newCategory } }
      );
    });
  }
  updateIncomeDescription(userId, incomeId, newDescription) {
    return __async(this, null, function* () {
      yield income_schema_default.findOneAndUpdate(
        { key: incomeId, "value.userId": userId },
        { $set: { "value.description": newDescription } }
      );
    });
  }
};

// src/modules/income/income.module.ts
var incomeService = new IncomeService();
var incomeController = new IncomeController(incomeService);

// src/utils/zod/income/income.zod.ts
var import_zod2 = require("zod");
var createIncomeSchema = import_zod2.z.object({
  value: import_zod2.z.number().positive("Valor deve ser positivo"),
  description: import_zod2.z.string().optional(),
  category: import_zod2.z.enum(["salario", "investimento", "freelance", "outros"])
});
var updateIncomeSchema = import_zod2.z.object({
  value: import_zod2.z.number().positive("Valor deve ser positivo").optional(),
  description: import_zod2.z.string().optional(),
  category: import_zod2.z.enum(["salario", "investimento", "freelance", "outros"]).optional()
});

// src/modules/income/income.router.ts
var incomeRouter = (0, import_express3.Router)();
incomeRouter.get(
  "/",
  authMiddleware,
  (req, res, next) => incomeController.getAllIncomes(req, res, next)
);
incomeRouter.get(
  "/:userId",
  authMiddleware,
  (req, res, next) => incomeController.getIncomeByUserId(req, res, next)
);
incomeRouter.post(
  "/",
  authMiddleware,
  validateBody(createIncomeSchema),
  (req, res, next) => incomeController.saveIncome(req, res, next)
);
incomeRouter.put(
  "/:incomeId",
  authMiddleware,
  validateBody(updateIncomeSchema),
  (req, res, next) => incomeController.updateIncome(req, res, next)
);
incomeRouter.delete(
  "/",
  authMiddleware,
  (req, res, next) => incomeController.deleteAllIncomes(req, res, next)
);
incomeRouter.delete(
  "/:incomeId",
  authMiddleware,
  (req, res, next) => incomeController.deleteIncome(req, res, next)
);
var income_router_default = incomeRouter;

// src/modules/expense/expense.router.ts
var import_express4 = require("express");

// src/modules/expense/expense.controller.ts
var ExpenseController = class {
  constructor(expenseService2) {
    this.expenseService = expenseService2;
  }
  getAllExpenses(_req, res, next) {
    return __async(this, null, function* () {
      try {
        const despesas = yield this.expenseService.getAllExpenses();
        res.status(200).json(despesas);
      } catch (error) {
        next(error);
      }
    });
  }
  getExpensesByUserId(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        const despesas = yield this.expenseService.getExpensesByUserId(userId);
        res.status(200).json(despesas);
      } catch (error) {
        next(error);
      }
    });
  }
  saveExpense(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { value, category, description } = req.body;
      try {
        yield this.expenseService.saveExpense(
          userId,
          value,
          category,
          description
        );
        res.status(200).json("Despesa criada com sucesso");
      } catch (error) {
        next(error);
      }
    });
  }
  updateExpense(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { expenseId } = req.params;
      const { value, description, category } = req.body;
      try {
        if (value) {
          yield this.expenseService.updateExpenseValue(userId, expenseId, value);
        }
        if (description) {
          yield this.expenseService.updateExpenseDescription(
            userId,
            expenseId,
            description
          );
        }
        if (category) {
          yield this.expenseService.updateExpenseCategory(
            userId,
            expenseId,
            category
          );
        }
        res.status(200).json({ message: "Despesa atualizada com sucesso" });
      } catch (error) {
        next(error);
      }
    });
  }
  deleteExpenseById(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { expenseId } = req.params;
      try {
        yield this.expenseService.deleteExpenseById(userId, expenseId);
        res.status(200).json("Despesa deletada");
      } catch (error) {
        next(error);
      }
    });
  }
  deleteAllExpenses(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      try {
        yield this.expenseService.deleteAllExpenses(userId);
        res.status(200).json("Todas as despesas foram removidas com sucesso.");
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/mongo/schemas/expense.schema.ts
var import_mongoose3 = __toESM(require("mongoose"));
var import_uuid3 = require("uuid");
var expenseSchema = new import_mongoose3.default.Schema({
  key: {
    type: String,
    required: true,
    default: import_uuid3.v4,
    unique: true
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose3.now)() },
    category: { type: String, required: true },
    description: { type: String, required: false }
  }
});
var expense_schema_default = import_mongoose3.default.model("ExpenseModel", expenseSchema);

// src/entities/expense.ts
var Expense = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};

// src/modules/expense/expense.service.ts
function toExpense(doc) {
  if (!(doc == null ? void 0 : doc.value))
    throw new BadRequestException("Documento inv\xE1lido ou incompleto.");
  return new Expense(doc._id.toString(), __spreadValues({}, doc.value));
}
var ExpenseService = class {
  getAllExpenses() {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find();
      return despesas.map(toExpense);
    });
  }
  getExpensesByUserId(userId) {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find({ "value.userId": userId });
      if (!despesas.length)
        throw new NotFoundException("Nenhuma despesa encontrada para o usu\xE1rio");
      return despesas.map(toExpense);
    });
  }
  saveExpense(userId, valor, category, description) {
    return __async(this, null, function* () {
      yield expense_schema_default.create({
        value: {
          userId,
          valor,
          category,
          description
        }
      });
    });
  }
  deleteAllExpenses(userId) {
    return __async(this, null, function* () {
      const despesas = yield expense_schema_default.find({ "value.userId": userId });
      if (!despesas.length)
        throw new NotFoundException("Nenhuma despesa encontrada para o usu\xE1rio");
      yield expense_schema_default.deleteMany({ "value.userId": userId });
    });
  }
  deleteExpenseById(userId, expenseId) {
    return __async(this, null, function* () {
      const despesa = yield expense_schema_default.findOne({
        _id: expenseId,
        "value.userId": userId
      });
      if (!despesa)
        throw new NotFoundException(
          `Despesa n\xE3o encontrada para o usu\xE1rio de id ${userId}`
        );
      yield expense_schema_default.deleteOne({ _id: expenseId });
    });
  }
  updateExpenseCategory(userId, expenseId, newCategory) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.category": newCategory } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
  updateExpenseDescription(userId, expenseId, newDescription) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.description": newDescription } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
  updateExpenseValue(userId, expenseId, newValue) {
    return __async(this, null, function* () {
      const result = yield expense_schema_default.findOneAndUpdate(
        { _id: expenseId, "value.userId": userId },
        { $set: { "value.valor": newValue } }
      );
      if (!result) throw new NotFoundException("Despesa n\xE3o encontrada");
    });
  }
};

// src/modules/expense/expense.module.ts
var expenseService = new ExpenseService();
var expenseController = new ExpenseController(expenseService);

// src/utils/zod/expense/expense.zod.ts
var import_zod3 = require("zod");
var createExpenseSchema = import_zod3.z.object({
  value: import_zod3.z.number().positive("Valor deve ser positivo"),
  description: import_zod3.z.string().optional(),
  category: import_zod3.z.enum([
    "supermercado",
    "educacao",
    "beleza",
    "sa\xFAde",
    "transporte",
    "outros"
  ])
});
var updateExpenseSchema = import_zod3.z.object({
  value: import_zod3.z.number().positive("Valor deve ser positivo").optional(),
  description: import_zod3.z.string().optional(),
  category: import_zod3.z.enum([
    "supermercado",
    "educacao",
    "beleza",
    "sa\xFAde",
    "transporte",
    "outros"
  ]).optional()
});

// src/modules/expense/expense.router.ts
var expenseRouter = (0, import_express4.Router)();
expenseRouter.get(
  "/",
  authMiddleware,
  (req, res, next) => expenseController.getAllExpenses(req, res, next)
);
expenseRouter.get(
  "/:userId",
  authMiddleware,
  (req, res, next) => expenseController.getExpensesByUserId(req, res, next)
);
expenseRouter.post(
  "/",
  authMiddleware,
  validateBody(createExpenseSchema),
  (req, res, next) => expenseController.saveExpense(req, res, next)
);
expenseRouter.delete(
  "/:expenseId",
  authMiddleware,
  (req, res, next) => expenseController.deleteExpenseById(req, res, next)
);
expenseRouter.delete(
  "/",
  authMiddleware,
  (req, res, next) => expenseController.deleteAllExpenses(req, res, next)
);
expenseRouter.put(
  "/:expenseId",
  authMiddleware,
  validateBody(updateExpenseSchema),
  (req, res, next) => expenseController.updateExpense(req, res, next)
);
var expense_router_default = expenseRouter;

// src/modules/report/report.router.ts
var import_express5 = require("express");

// src/modules/report/report.controller.ts
var ReportController = class {
  constructor(reportService2) {
    this.reportService = reportService2;
  }
  generateReport(req, res, next) {
    return __async(this, null, function* () {
      const userId = req.user.sub;
      const { tipo, mes, ano } = req.query;
      try {
        if (!userId || !ano) {
          res.status(400).json({ message: "Par\xE2metros inv\xE1lidos" });
        }
        if (tipo === "mensal") {
          const report = yield this.reportService.generateMonthlyReport(
            userId,
            Number(mes),
            Number(ano)
          );
          res.json(report);
        }
        if (tipo === "anual") {
          const report = yield this.reportService.generateAnnualReport(
            userId,
            Number(ano)
          );
          res.json(report);
        }
        res.status(400).json({ message: "Tipo de relat\xF3rio inv\xE1lido" });
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/modules/report/report.service.ts
var ReportService = class {
  generateMonthlyReport(userId, month, year) {
    return __async(this, null, function* () {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      const despesas = yield expense_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const receitas = yield income_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const totalDespesas = despesas.length ? despesas.reduce((acc, d) => acc + (d.value.valor || 0), 0) : 0;
      const totalReceitas = receitas.length ? receitas.reduce((acc, r) => acc + (r.value.valor || 0), 0) : 0;
      const saldo = totalReceitas - totalDespesas;
      return {
        mes: month,
        ano: year,
        despesas,
        receitas,
        totalDespesas: parseFloat(totalDespesas.toFixed(2)),
        totalReceitas: parseFloat(totalReceitas.toFixed(2)),
        saldo: parseFloat(saldo.toFixed(2))
      };
    });
  }
  generateAnnualReport(userId, year) {
    return __async(this, null, function* () {
      const start = new Date(year, 0, 1);
      const end = new Date(year + 1, 0, 1);
      const despesas = yield expense_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const receitas = yield income_schema_default.find({
        "value.userId": userId,
        "value.date": { $gte: start, $lt: end }
      });
      const totalDespesas = despesas.reduce(
        (acc, d) => {
          var _a;
          return acc + (((_a = d.value) == null ? void 0 : _a.valor) || 0);
        },
        0
      );
      const totalReceitas = receitas.reduce(
        (acc, r) => {
          var _a;
          return acc + (((_a = r.value) == null ? void 0 : _a.valor) || 0);
        },
        0
      );
      const saldo = totalReceitas - totalDespesas;
      return {
        ano: year,
        despesas,
        receitas,
        totalExpenses: parseFloat(totalDespesas.toFixed(2)),
        totalIncome: parseFloat(totalReceitas.toFixed(2)),
        balance: parseFloat(saldo.toFixed(2))
      };
    });
  }
};

// src/modules/report/report.module.ts
var reportService = new ReportService();
var reportController = new ReportController(reportService);

// src/modules/report/report.router.ts
var reportRouter = (0, import_express5.Router)();
reportRouter.get(
  "/",
  authMiddleware,
  (req, res, next) => reportController.generateReport(req, res, next)
);
var report_router_default = reportRouter;

// src/routes/routes.ts
var Routes = class {
  static define(router) {
    router.use("/user", user_router_default);
    router.use("/login", auth_router_default);
    router.use("/income", income_router_default);
    router.use("/expense", expense_router_default);
    router.use("/report", report_router_default);
    return router;
  }
};
var routes_default = Routes;

// src/mongo/db.ts
var import_mongoose4 = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var MONGO_URI = process.env.DATABASE_URL || "";
var connectDatabase = () => __async(null, null, function* () {
  try {
    yield import_mongoose4.default.connect(MONGO_URI);
    console.log("\u2705 Conectado ao MongoDB");
  } catch (error) {
    console.error("\u274C Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
});

// src/app.ts
import_dotenv2.default.config();
var App = class {
  constructor() {
    this.app = (0, import_express6.default)();
    this.port = Number(process.env.PORT) || 0;
    this.middlewares();
    this.routes();
    this.database();
  }
  middlewares() {
    this.app.use(import_express6.default.json());
  }
  routes() {
    const router = import_express6.default.Router();
    this.app.use("/", routes_default.define(router));
  }
  database() {
    return __async(this, null, function* () {
      yield connectDatabase();
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`\u{1F680} Servidor rodando na porta ${this.port}`);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
