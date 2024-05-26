import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { CreateUserDto } from '../interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { isEmpty, secondsToDhms, randomString } from '../utils/util';
import { userModel } from '../models';
import { userService, emailService } from './';
import { HttpError } from '../exceptions/HttpError';

class AuthService {
  public async register(userData: CreateUserDto): Promise<User> {
    const createUserData = await userService.create(userData);

    await emailService.sendRegisterMail(createUserData.id, createUserData.email, createUserData.email_verifycode);

    return createUserData;
  }

  public async verifyEmail(userId: number, code: string): Promise<void> {
    const findUser: User | null = await userModel.getBy('id', userId);
    if (!findUser) throw new HttpError(409, `User with id ${userId} was not found`);
    console.log(findUser.email_verifycode, code);
    if (findUser.email_verifycode != code) throw new HttpError(409, `Email verification code does not match`);

    await userModel.setBy(userId, 'is_email_verified', true);

    return;
  }
  
  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpError(400, 'userData is empty');
    
    const findUser: User | null = await userModel.getBy('email', userData.email);
    if (!findUser) throw new HttpError(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpError(409, "Password is not matching");

    if (!findUser.is_email_verified) throw new HttpError(409, "Email is not verified. Please check your mailbox for the verification link");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);
    
    return { cookie, findUser };
  }

  /*
  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpError(400, 'userData is empty');

    const findUser: User | null = await userModel.getBy('id',userData.id);
    if (!findUser) throw new HttpError(409, `This email ${userData.email} was not found`);

    return findUser;
  }*/

  public async resetPassword(email: string): Promise<void> {
    if (isEmpty(email)) throw new HttpError(400, 'email is empty');
    
    const findUser: User | null = await userModel.getBy('email', email);
    if (!findUser) throw new HttpError(409, `This email ${email} was not found`);

    if (!findUser.is_email_verified) throw new HttpError(409, "Email is not verified. Please check your mailbox for the verification link");

    const cooldownSec = 23 * 60 * 60 - (Date.now() - findUser.last_reset_password) / 1000 ;
    if (cooldownSec > 0) throw new HttpError(409, `You need to wait another ${secondsToDhms(cooldownSec)} for a password reset`);
    console.log(cooldownSec);
    const newPassword = randomString(12);
    const hashedPassword = await hash(newPassword, 10);
    
    await userModel.setBy(findUser.id,'last_reset_password',Date.now());
    emailService.sendResetPasswordEmail(findUser.email, findUser.username, newPassword);
    await userModel.setBy(findUser.id,'password',hashedPassword);

    return;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.JWT_SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 30;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; path=/`;
  }
}


export default AuthService;
