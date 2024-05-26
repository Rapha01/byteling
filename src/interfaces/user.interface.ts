export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
  is_email_verified: boolean;
  email_verifycode: string;
  last_reset_password: number;
  last_send_emailverification: number;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserModelInterface {
  getById (id: number): Promise<User>;
}