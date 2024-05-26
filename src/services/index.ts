import AuthService from './auth.service';
import UserService from './user.service';
import EmailService from './email.service';

const authService = new AuthService();
const userService = new UserService();
const emailService = new EmailService();

export {
    authService,
    userService,
    emailService
}