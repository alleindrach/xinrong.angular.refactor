import { Result } from './result';

export class Session extends Result {
    isAuthBankCard: number;
    isAuthEmail: number;
    isAuthIden: number;
    isAuthMobile: number;
    state: number;
    uid: number;
    uname: String;
    vip: number;
}
