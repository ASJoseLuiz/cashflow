import { compareSync, hash } from "bcrypt";
import { User } from "../../entities/user";
import userModel from "../../mongo/schemas/user.schema";
import { HttpException } from "../../utils/http/HttpException";
import { NotFoundException } from "../../utils/http/NotFoundException";
import { BadRequestException } from "../../utils/http/BadRequestException";
import { ForbiddenException } from "../../utils/http/ForbiddenException";

function toUser(doc: any): User {
  if (!doc?.value)
    throw new HttpException(400, "Documento inválido ou incompleto.");
  return new User(doc.key, { ...doc.value });
}

export class UserService {
  public async getUserByEmail(email: string): Promise<User> {
    const user = await userModel.findOne({ "value.email": email });
    if (!user)
      throw new NotFoundException(`Usuário de email ${email} não encontrado`);
    return toUser(user);
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await userModel.find();
    return users.map(
      (doc) =>
        new User(doc.key, {
          name: doc.value!.name,
          email: doc.value!.email,
          password: doc.value!.password,
        })
    );
  }

  public async saveUser(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    const exists = await userModel.findOne({ "value.email": email });

    if (exists)
      throw new BadRequestException(`Usuário de email ${email} já existe`);

    if (password != confirmPassword)
      throw new ForbiddenException("Senha incorreta");

    const hashedPassword = await hash(password, 10);

    await userModel.create({
      value: { name, email, password: hashedPassword },
    });
  }

  public async deleteUser(email: string, password: string): Promise<void> {
    const user = await userModel.findOne({ "value.email": email });
    if (!user) throw new NotFoundException("Usuário não existe");
    if (!user.value)
      throw new HttpException(406, "Documento inválido ou incompleto.");

    const isValid = compareSync(password, user.value.password);
    if (!isValid) throw new ForbiddenException("Usuário não autorizado");

    await userModel.deleteOne({ "value.email": email });
  }

  public async updateUserEmail(key: string, newEmail: string): Promise<void> {
    await userModel.findOneAndUpdate(
      { key },
      { $set: { "value.email": newEmail } }
    );
  }

  public async updateUserName(key: string, newName: string): Promise<void> {
    await userModel.findOneAndUpdate(
      { key },
      { $set: { "value.name": newName } }
    );
  }

  public async updateUserPassword(
    key: string,
    newPassword: string
  ): Promise<void> {
    const user = await userModel.findOne({ key });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (!user.value) {
      throw new HttpException(406, "Documento inválido ou incompleto.");
    }

    const hashedPassword = await hash(newPassword, 10);

    await userModel.updateOne(
      { key },
      { $set: { "value.password": hashedPassword } }
    );
  }
}
