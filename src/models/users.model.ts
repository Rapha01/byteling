
import { User, UserModelInterface, CreateUserDto } from '../interfaces/users.interface';

class UserModel {
  public async getById(id: number): Promise<User> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return user;
  }

  public async create(usr: CreateUserDto): Promise<User> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return user;
  }

  public async update(userId: number, value: any): Promise<User> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return user;
  }


  public async delete(userId: number): Promise<User> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return user;
  }

  public async getAll(): Promise<[User]> {
    const user: User = {
      id:1,
      email: '',
      password: ''
    }
    return [user];
  }
}

const userModel = new UserModel();


export default userModel;