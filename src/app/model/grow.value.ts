import { Result } from './result';

export class GrowValue extends Result {
    autoVip:number;
    private _vipDeadLine:number;
    private _curGrowthValue:number;
    private _nextLevelGrowthValue:number;
    private _investOneMonthGrowthValue:number;
    private _investTwoMonthGrowthValue:number;
    curVip:number;
    get vipDeadLine():number{
        return Number(this._vipDeadLine);
    }
    set vipDeadLine(value:number){
        this._vipDeadLine=Number(value);
    }
    get curGrowthValue():number{
        return Number(this._curGrowthValue);
    }
    set curGrowthValue(value:number){
        this._curGrowthValue=Number(value);
    }

    get nextLevelGrowthValue():number{
        return Number(this._nextLevelGrowthValue);
    }
    set nextLevelGrowthValue(value:number){
        this._nextLevelGrowthValue=Number(value);
    }

    get investOneMonthGrowthValue():number{
        return Number(this._investOneMonthGrowthValue);
    }
    set investOneMonthGrowthValue(value:number){
        this._investOneMonthGrowthValue=Number(value);
    }
    get investTwoMonthGrowthValue():number{
        return Number(this._investTwoMonthGrowthValue);
    }
    set investTwoMonthGrowthValue(value:number){
        this._investTwoMonthGrowthValue=Number(value);
    }

}
