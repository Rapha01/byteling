
import { logger } from '../utils/logger';
import { User, CreateUserDto } from '../interfaces/user.interface';
import db from './db';
import { QueryResult } from 'pg';
import config from '../config/config';

class UserModel {
  public async create(email: string, username: string, password: string, role: string, email_verifycode: string): Promise<User | null> {
    const result: QueryResult = await db.query('INSERT INTO public.user(email,username,password,role,email_verifycode) VALUES ($1,$2,$3,$4,$5) RETURNING id',[email, username, password, role, email_verifycode]);
    
    if (result.rows.length == 0)
      return null;

    const user: User | null = await this.getBy('id', result.rows[0].id);
     
    return user;
  }


  /*
  public async getById(id: number): Promise<User> {
    
    const user: User = {
      id:1,
      email: '',
      password: '',
      role:'',
      is_email_verified: false,
      email_verifycode: ''
    }
    return user;
  }*/

  public async getBy(field: string, value: string | number | boolean): Promise<User | null> {
    const result: QueryResult = await db.query(`SELECT * FROM public.user WHERE ${field} = $1`,[value]);

    if (result.rows.length == 0)
      return null;

    return result.rows[0];
  }

  public async setBy(userId: number, field: string, value: string | number | boolean): Promise<User | null> {
    const result: QueryResult = await db.query(`UPDATE public.user SET ${field} = $2 WHERE id = $1`,[userId, value]);

    if (result.rows.length == 0)
      return null;

    return result.rows[0];
  }

}

export default UserModel;