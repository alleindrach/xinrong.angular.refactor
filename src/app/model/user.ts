import { Result } from './result';

export class User extends Result {
    static TAG = 'user';
    id: number;
    eswAccountId: number;
    eswAccountStatus: number;
    vip = 0;
    isCheckedBankCard: boolean = undefined;
    isCheckedMobile: boolean = undefined;
    isCheckedEmail: boolean = undefined;
    isCheckedIdentification: boolean = undefined;
    hasTradePassword: boolean = undefined;
    mobile: string;
    name: string;
    sex: number;
}
