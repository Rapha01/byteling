import { User } from './user.interface';
import { Request } from 'express';

export interface Toast {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
}

export interface MyRequest extends Request {
    locals: {user: User | null, toasts: []};
}