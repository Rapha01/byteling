export interface User {
  id: number;
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserModelInterface {
  getById (id: number): Promise<User>;
}