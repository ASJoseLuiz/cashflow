import { compareSync } from "bcrypt";
import userModel from "../../mongo/schemas/user.schema";

import jwt from "jsonwebtoken";
import { NotFoundException } from "../../utils/http/NotFoundException";
import { ForbiddenException } from "../../utils/http/ForbiddenException";
import { HttpException } from "../../utils/http/HttpException";

interface UserPayload {
  sub: string;
  email: string;
}

export class AuthService {
  public async login(email: string, password: string): Promise<string | null> {
    const user = await userModel.findOne({ "value.email": email });
    if (!user) {
      throw new NotFoundException(`Usuário de email ${email} não encontrado`);
    }

    if (!user.value) {
      throw new HttpException(401, "documento inválido");
    }

    const passwordIsValid = compareSync(password, user.value.password);

    if (!passwordIsValid) {
      throw new ForbiddenException("Não autorizado. Senha ou email inválidos.");
    }

    const payload: UserPayload = { sub: user.key, email: user.value.email };
    const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: "1h",
    });

    return token;
  }
}
