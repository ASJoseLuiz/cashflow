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

// src/modules/expense/expense.router.ts
var expense_router_exports = {};
__export(expense_router_exports, {
  default: () => expense_router_default
});
module.exports = __toCommonJS(expense_router_exports);
var import_express = require("express");

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
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var expenseSchema = new import_mongoose.default.Schema({
  key: {
    type: String,
    required: true,
    default: import_uuid.v4,
    unique: true
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    date: { type: Date, required: true, default: (0, import_mongoose.now)() },
    category: { type: String, required: true },
    description: { type: String, required: false }
  }
});
var expense_schema_default = import_mongoose.default.model("ExpenseModel", expenseSchema);

// src/entities/expense.ts
var Expense = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};

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

// src/utils/zod/expense/expense.zod.ts
var import_zod = require("zod");
var createExpenseSchema = import_zod.z.object({
  value: import_zod.z.number().positive("Valor deve ser positivo"),
  description: import_zod.z.string().optional(),
  category: import_zod.z.enum([
    "supermercado",
    "educacao",
    "beleza",
    "sa\xFAde",
    "transporte",
    "outros"
  ])
});
var updateExpenseSchema = import_zod.z.object({
  value: import_zod.z.number().positive("Valor deve ser positivo").optional(),
  description: import_zod.z.string().optional(),
  category: import_zod.z.enum([
    "supermercado",
    "educacao",
    "beleza",
    "sa\xFAde",
    "transporte",
    "outros"
  ]).optional()
});

// src/modules/expense/expense.router.ts
var expenseRouter = (0, import_express.Router)();
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
