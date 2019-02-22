import { Result } from './result';

export class LoginFail extends Result {
    username: string;
    imei: string;
    loginTimes: number;
}
