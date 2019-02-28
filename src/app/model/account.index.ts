import { Result } from './result';

export class AccountIndex extends Result {
    name:string;
    deadline:number;
    vip:number;
    private _money:number;
    isCheckedBankCard:number;
    private _rewardMoney:number;
    isCheckedEmail:number;
    isCheckedIdentification:number;
    isCheckedMobile:number;
    private _score:number;
    vipDeadLine:number;


    get score():number{
        return Number(this._score?this._score:0);
    }
    set score(value:number){
        this._score=Number(value?value:0);
    }

    get money():number{
        return Number(this._money?this._money:0);
    }
    set money(value:number){
        this._money=Number(value?value:0);
    }

    get rewardMoney():number{
        return Number(this._rewardMoney?this._rewardMoney:0);
    }
    set rewardMoney(value:number){
        this._rewardMoney=Number(value?value:0);
    }
}
