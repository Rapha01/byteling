import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { CreateUserDto } from '../interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { isEmpty } from '../utils/util';
import { userModel } from '../models';
import { userService } from './';
import { HttpError } from '../exceptions/HttpError';
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import { promises as fs } from "fs";
import ejs from 'ejs';

const connection = {
  host: config.MAIL_SMTPHOST,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(connection);


class EmailService {
  public async sendRegisterMail(userId: number, email: string, code: string): Promise<boolean> {
    const html = await ejs.renderFile('./src/views/email/register.ejs', { verificationUrl:`https://byteling.com/login?userId=${userId}&code=${code}`});

    var message = {
      from: config.MAIL_USER,
      to: email,
      subject: "Email verification for " + config.HOST,
      text: "",
      html: html,
    };

    const info = await transporter.sendMail(message);
    logger.debug("Message sent: %s", info.messageId);

    return true;
  }

  public async sendResetPasswordEmail(email: string, username: string, password: string): Promise<boolean> {
    const html = await ejs.renderFile('./src/views/email/resetPassword.ejs', {username, password});

    var message = {
      from: config.MAIL_USER,
      to: email,
      subject: "Reset Password for " + username + " for " + config.HOST,
      text: "",
      html: html,
    };

    const info = await transporter.sendMail(message);
    logger.debug("Message sent: %s", info.messageId);

    return true;
  }

  public async sendTestMail(targetEmail: string): Promise<void> {
    const html = await ejs.renderFile('./src/views/email/test.ejs', {});

    var message = {
      from: config.MAIL_USER,
      to: targetEmail,
      subject: "Test email",
      text: "Plaintext version of the message",
      html: html,
    };

    const info = await transporter.sendMail(message);
    logger.debug("Message sent: %s", info.messageId);
  }
}


export default EmailService;
