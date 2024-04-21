import { hash } from 'bcryptjs';
import { CreateUserDto } from '../interfaces/users.interface';
import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { isEmpty } from '../utils/util';
import userModel from '../models/users.model';

class UserService {
  public users = userModel;

  public async getAll(): Promise<User[]> {
    const users: User[] = await userModel.getAll();
    return users;
  }

  public async getById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

    const findUser: User = await userModel.getById(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await userModel.getByEmail(userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    if (userData.email) {
      const findUser: User = await userModel.getByEmail(userData.email);
      if (findUser && findUser.id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await userModel.update(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: number): Promise<User> {
    const deleteUserById: User = await this.users.delete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
