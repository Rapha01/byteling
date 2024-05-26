import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from '../interfaces/user.interface';
import { User } from '../interfaces/user.interface';
import { isEmpty, randomString } from '../utils/util';
import { userModel } from '../models';
import { HttpError } from '../exceptions/HttpError';

class UserService {
  public async create(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpError(400, 'userData is empty');

    const findUserEmail: User | null = await userModel.getBy('email',userData.email);
    if (findUserEmail) throw new HttpError(409, `This email ${userData.email} already exists`);

    const findUserUsername: User | null = await userModel.getBy('username',userData.username);
    if (findUserUsername) throw new HttpError(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const emailVerifyCode = randomString(10);

    const createUserData: User | null = await userModel.create(userData.email, userData.username, hashedPassword, 'user', emailVerifyCode);
    if (!createUserData) throw new HttpError(409, `User creation for ${userData.email} failed`);

    return createUserData;
  }

  public async changePassword(loggedInUser: User, oldPassword: string, newPassword: string): Promise<void> {   
    const findUser: User | null = await userModel.getBy('id', loggedInUser.id);
    if (!findUser) throw new HttpError(409, `This user with id ${loggedInUser.id} was not found`);

    const isPasswordMatching: boolean = await compare(oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpError(409, "Password is not matching");
    
    const hashedPassword = await hash(newPassword, 10);

    userModel.setBy(loggedInUser.id, 'password', hashedPassword);

    return;
  }

  public async getById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpError(400, 'UserId is empty');

    const findUser: User | null = await userModel.getBy('id',userId);
    if (!findUser) throw new HttpError(409, "User doesn't exist");

    return findUser;
  }

  /*
  public async getAll(): Promise<User[]> {
    const users: User[] = await userModel.getAll();
    return users;
  }

  public async update(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpError(400, 'userData is empty');

    if (userData.email) {
      const findUser: User | null = await userModel.getBy('email', userData.email);
      if (findUser && findUser.id != userId) throw new HttpError(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await userModel.update(userId, { userData });
    if (!updateUserById) throw new HttpError(400, 'User doesn\'t exist');

    return updateUserById;
  }

  public async delete(userId: number): Promise<User> {
    const deleteUserById: User = await userModel.delete(userId);
    if (!deleteUserById) throw new HttpError(400, 'User doesn\'t exist');

    return deleteUserById;
  }*/
}


export default UserService;
